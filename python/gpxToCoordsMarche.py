import gpxpy
import os

def clear_file(file_path):
    with open(file_path, 'w') as f:
        f.truncate(0)

def calculate_denivele(gpx):
    """Calcule le dénivelé positif total du circuit"""
    total_elevation_gain = 0.0

    for track in gpx.tracks:
        for segment in track.segments:
            previous_elevation = None
            for point in segment.points:
                if previous_elevation is not None and point.elevation > previous_elevation:
                    total_elevation_gain += point.elevation - previous_elevation
                previous_elevation = point.elevation

    return round(total_elevation_gain, 2)  # Arrondi à 2 décimales

def gpx_to_js(gpx_file, js_file, circuit, n):
    with open(gpx_file, 'r') as f:
        gpx = gpxpy.parse(f)

    denivele = calculate_denivele(gpx)  # Calcul du dénivelé

    js_content = f"// Coordonnees du circuit marche {circuit}\n"
    js_content += f"let metaDatasCircuitMarche{n} = {{\n"
    js_content += f"  longueur: {circuit},\n"
    js_content += f"  denivele: {denivele}\n"
    js_content += "};\n\n"
    js_content += f"let coordsCircuitMarche{n} = [\n"

    for track in gpx.tracks:
        for segment in track.segments:
            for point in segment.points:
                js_content += f"  [{point.longitude}, {point.latitude}],\n"

    js_content += "];\n\n"

    with open(js_file, 'a') as js:
        js.write(js_content)

    print(f"Les coordonnées du circuit {circuit} ont été ajoutées avec un dénivelé de {denivele} m.")

if __name__ == "__main__":
    circuits = ["7", "11", "15"]    
    output_js_file = "../js/coordsCircuitsMarche.js"

    if os.path.exists(output_js_file):
        clear_file(output_js_file)

    n = 0

    for circuit in circuits:
        input_gpx_file = f"../fichiers/Marche/{circuit}.gpx"
        gpx_to_js(input_gpx_file, output_js_file, circuit, n)
        n += 1

    print("Toutes les conversions sont terminées.")