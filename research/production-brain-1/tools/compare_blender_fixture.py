import bpy, sys, json, math
from pathlib import Path
p = Path(sys.argv[sys.argv.index('--') + 1]).resolve()
a = json.loads((p / 'build.json').read_text())
b = json.loads((p / 'verify.json').read_text())
images = [bpy.data.images.load(str(p / name), check_existing=False) for name in ('build.png', 'verify.png')]
pixels = [list(image.pixels) for image in images]
assert len(pixels[0]) == len(pixels[1]) and len(pixels[0]) > 0
differences = [abs(x - y) for x, y in zip(*pixels)]
maximum = max(differences)
rmse = math.sqrt(sum(d * d for d in differences) / len(differences))
contact_height = b['samples'][-1]['bodyPosition'][2]
checks = {
    'simulationReplay': a['samples'] == b['samples'],
    'bakedCache': a['cacheBaked'] and b['cacheBaked'],
    'groundContact': abs(contact_height - 0.4) < 0.01,
    'assemblyReturns': all(abs(initial-final) < 1e-6 for name in a['samples'][0]['parts']
                          for initial, final in zip(a['samples'][0]['parts'][name], b['samples'][-1]['parts'][name])),
    'renderReplay': maximum <= 1 / 255 and rmse <= 0.001,
    'editableScene': a['editableObjects'] == b['editableObjects'] and len(b['editableObjects']) >= 8
}
receipt = {'schemaVersion': 1, 'checks': checks, 'allPassed': all(checks.values()),
           'pixelComparison': {'maximumAbsoluteError': maximum, 'rmse': rmse,
                               'maximumTolerance': 1 / 255, 'rmseTolerance': 0.001},
           'note': 'Byte hashes may differ because PNG metadata differs. Compare decoded pixels; no model or Hollywood benchmark was run.'}
(p / 'comparison.json').write_text(json.dumps(receipt, indent=2), encoding='utf-8')
print(json.dumps(receipt))
if not receipt['allPassed']:
    raise RuntimeError('Acceptance checks failed')
