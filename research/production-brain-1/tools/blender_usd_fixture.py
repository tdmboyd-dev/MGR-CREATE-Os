import bpy, sys, json, math
from pathlib import Path
destination = Path(sys.argv[sys.argv.index('--') + 1]).resolve()
bpy.ops.wm.open_mainfile(filepath=str(destination / 'production-fixture.blend'))
scene = bpy.context.scene
scene.frame_set(48)
camera = scene.camera
original = {'position': list(camera.matrix_world.translation), 'rotation': list(camera.matrix_world.to_quaternion()),
            'focalMm': camera.data.lens, 'sensorMm': camera.data.sensor_width}
output = destination / 'fixture.usda'
if output.exists():
    raise ValueError('Refusing to replace USD fixture')
result = bpy.ops.wm.usd_export(filepath=str(output), selected_objects_only=False, export_animation=False)
if result != {'FINISHED'}:
    raise RuntimeError('USD export did not finish')
text = output.read_text(encoding='utf-8')
bpy.ops.wm.read_factory_settings(use_empty=True)
result = bpy.ops.wm.usd_import(filepath=str(output))
if result != {'FINISHED'}:
    raise RuntimeError('USD import did not finish')
cameras = [obj for obj in bpy.data.objects if obj.type == 'CAMERA']
if len(cameras) != 1:
    raise RuntimeError('Expected one imported camera')
camera = cameras[0]
bpy.context.view_layer.update()
position_error = (camera.matrix_world.translation - __import__('mathutils').Vector(original['position'])).length
rotation_error = camera.matrix_world.to_quaternion().rotation_difference(__import__('mathutils').Quaternion(original['rotation'])).angle
checks = {'position': position_error < 1e-5, 'rotation': abs(rotation_error) < 1e-5,
          'focalLength': abs(camera.data.lens - original['focalMm']) < 1e-5,
          'sensorWidth': abs(camera.data.sensor_width - original['sensorMm']) < 1e-5,
          'declaredUnits': 'metersPerUnit' in text, 'declaredAxis': 'upAxis' in text}
receipt = {'schemaVersion':1,'runtime':bpy.app.version_string,'checks':checks,'allPassed':all(checks.values()),
           'positionErrorMetres':position_error,'rotationErrorRadians':rotation_error,
           'original':original,'imported':{'position':list(camera.matrix_world.translation),'focalMm':camera.data.lens,'sensorMm':camera.data.sensor_width},
           'scope':'Single static camera through actual Blender USD export/import. No claim that physics, material graphs, references or variants survive this export.'}
(destination / 'usd-comparison.json').write_text(json.dumps(receipt, indent=2),encoding='utf-8')
print(json.dumps(receipt))
if not receipt['allPassed']:
    raise RuntimeError('USD camera roundtrip failed')
