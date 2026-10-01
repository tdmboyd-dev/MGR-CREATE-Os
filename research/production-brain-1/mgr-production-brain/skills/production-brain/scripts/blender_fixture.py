"""CPU production acceptance fixture. Run only in isolated background Blender.

This creates a procedural scene; it does not certify photorealism or model output.
"""
import bpy, json, sys, math, hashlib
from pathlib import Path
from mathutils import Vector

args = sys.argv[sys.argv.index('--') + 1:]
if len(args) != 2 or args[0] not in ('build', 'verify'):
    raise ValueError('Expected -- build|verify OUTPUT_DIRECTORY')
mode, destination = args[0], Path(args[1]).resolve()
destination.mkdir(parents=True, exist_ok=True)
project = destination / 'production-fixture.blend'
scene = bpy.context.scene
if mode == 'build':
    if project.exists():
        raise ValueError('Refusing to overwrite existing fixture')
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete(use_global=False)
    scene.render.engine = 'CYCLES'
    scene.cycles.device = 'CPU'
    scene.cycles.samples = 8
    scene.render.resolution_x, scene.render.resolution_y = 320, 180
    scene.render.resolution_percentage = 100
    scene.render.image_settings.file_format = 'PNG'
    scene.render.fps, scene.render.fps_base = 24, 1.0
    scene.frame_start, scene.frame_end = 1, 48
    scene.world.color = (0.12, 0.12, 0.12)
    def cube(name, location, scale, color):
        bpy.ops.mesh.primitive_cube_add(size=1, location=location)
        obj = bpy.context.object
        obj.name, obj.scale = name, scale
        bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
        obj['mgr_asset_id'] = name
        obj['mgr_units'] = 'metres'
        material = bpy.data.materials.new(name + '-surface')
        material.diffuse_color = (*color, 1)
        obj.data.materials.append(material)
        return obj
    floor = cube('ground', (0, 0, -0.25), (8, 8, 0.5), (0.12, 0.15, 0.19))
    bpy.ops.rigidbody.object_add()
    floor.rigid_body.type = 'PASSIVE'
    falling = cube('contact-body', (0, 0, 3), (0.8, 0.8, 0.8), (0.7, 0.19, 0.06))
    bpy.ops.rigidbody.object_add()
    falling.rigid_body.mass = 1
    falling.rigid_body.collision_shape = 'BOX'
    falling.rigid_body.use_margin = True
    falling.rigid_body.collision_margin = 0.005
    falling.rigid_body.restitution = 0
    world = scene.rigidbody_world
    world.substeps_per_frame, world.solver_iterations = 10, 20
    world.point_cache.frame_start, world.point_cache.frame_end = 1, 48
    root = bpy.data.objects.new('assembly-root', None)
    scene.collection.objects.link(root)
    for index in range(3):
        part = cube('assembly-part-' + str(index), (index - 1, 2, 0.4), (0.6, 0.6, 0.6), (0.06, 0.4, 0.5))
        part.parent = root
        part.keyframe_insert('location', frame=1)
        part.location.z += 1.0 + index * 0.3
        part.keyframe_insert('location', frame=24)
        part.location.z -= 1.0 + index * 0.3
        part.keyframe_insert('location', frame=48)
    bpy.ops.object.camera_add(location=(7, -9, 6))
    camera = bpy.context.object
    camera.name = 'production-camera'
    camera.rotation_euler = (Vector((0, 1, 0.7)) - camera.location).to_track_quat('-Z', 'Y').to_euler()
    camera.data.lens, camera.data.sensor_width = 45, 36
    camera.data.clip_start, camera.data.clip_end = 0.1, 100
    scene.camera = camera
    bpy.ops.object.light_add(type='AREA', location=(2, -3, 7))
    bpy.context.object.data.energy = 900
    bpy.context.object.data.shape = 'DISK'
    bpy.context.object.data.size = 5
    scene.unit_settings.system = 'METRIC'
    scene.unit_settings.scale_length = 1
    scene['mgr_fixture'] = 'cpu-contact-assembly-camera'
    # Bake before saving: replay must survive a separate process.
    with bpy.context.temp_override(scene=scene, point_cache=world.point_cache):
        bpy.ops.ptcache.bake(bake=True)
    bpy.ops.wm.save_as_mainfile(filepath=str(project))
else:
    bpy.ops.wm.open_mainfile(filepath=str(project))
    scene = bpy.context.scene

samples = []
for frame in (1, 24, 48):
    scene.frame_set(frame)
    dependency_graph = bpy.context.evaluated_depsgraph_get()
    body = bpy.data.objects['contact-body'].evaluated_get(dependency_graph)
    samples.append({'frame': frame, 'bodyPosition': list(body.matrix_world.translation),
                    'parts': {obj.name: list(obj.location) for obj in bpy.data.objects if obj.name.startswith('assembly-part-')}})
scene.frame_set(48)
scene.render.filepath = str(destination / (mode + '.png'))
bpy.ops.render.render(write_still=True)
receipt = {'schemaVersion': 1, 'mode': mode, 'runtime': bpy.app.version_string,
           'buildHash': bpy.app.build_hash.decode(), 'engine': scene.render.engine,
           'device': scene.cycles.device, 'samples': samples,
           'cacheBaked': scene.rigidbody_world.point_cache.is_baked,
           'editableObjects': sorted(obj.name for obj in bpy.data.objects),
           'camera': {'lensMm': scene.camera.data.lens, 'sensorMm': scene.camera.data.sensor_width},
           'render': {'width': scene.render.resolution_x, 'height': scene.render.resolution_y},
           'scope': 'Procedural contact, keyframe assembly, camera and editable project replay; no Hollywood quality claim'}
image_bytes = Path(scene.render.filepath).read_bytes()
receipt['imageSha256'] = hashlib.sha256(image_bytes).hexdigest()
receipt['projectSha256'] = hashlib.sha256(project.read_bytes()).hexdigest()
(destination / (mode + '.json')).write_text(json.dumps(receipt, indent=2), encoding='utf-8')
