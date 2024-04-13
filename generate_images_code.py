template = '''{{
    imageUrl: "randommap/{}.png",
    lat: {},
    lng: {},
    currentLocation: "{}"
}},
'''

def generate_code(template, input_file, output_file):
    with open(input_file, 'r') as file:
        lines = file.readlines()

    with open(output_file, 'w') as file:
        for line in lines:
            parts = line.split()
            if len(parts) >= 4:
                location = parts[0]
                number = parts[1]
                lat = parts[2]
                lng = parts[3]
                
                if location == "mcz":
                    location = "Master Control Zone"
                if location == "bz":
                    location = "Base Zone"
                if location == "stz-b1":
                    location = "Storage Zone - B1"
                if location == "stz-f1":
                    location = "Storage Zone - F1"
                if location == "stz-f2":
                    location = "Storage Zone - F2"
                if location == "suz-f1":
                    location = "Supply Zone - F2"
                if location == "suz-f2":
                    location = "Supply Zone - F2"
                if location == "scz-f1":
                    location = "Seclusion Zone - F1"
                if location == "scz-f2":
                    location = "Seclusion Zone - F2"
                if location == "scz-f3":
                    location = "Seclusion Zone - F3"
                if location == "scz-f3":
                    location = "Seclusion Zone - F3"
                if location == "ad-b1":
                    location = "Administrative District - B1"
                if location == "ad-f1":
                    location = "Administrative District - F1"
                if location == "osp":
                    location = "Outlying Snow Plains"
                if location == "bp":
                    location = "Backwater Pass"
                if location == "sgrz":
                    location = "Silvermane Guards Restricted Zone"
                if location == "cofe":
                    location = "Corridor of Fading Echoes"
                if location == "eh":
                    location = "Everwinter Hill"
                if location == "poc":
                    location = "Pillars of Creation"
                if location == "owtg-f1":
                    location = "Old Weapon Testing Ground - F1"
                if location == "owtg-f2":
                    location = "Old Weapon Testing Ground - F2"
                if location == "bt":
                    location = "Boulder Town"
                if location == "gm":
                    location = "Great Mine"
                if location == "rt-f1":
                    location = "Rivet Town - F1"
                if location == "rt-f2":
                    location = "Rivet Town - F2"
                if location == "rs-f1":
                    location = "Robot Settlement - F1"
                if location == "rs-f2":
                    location = "Robot Settlement - F2"

                code = template.format(number, lat, lng, location)
                file.write(code)

input_file = 'data.txt'  # Replace with the path to your input fil
output_file = 'output.txt'  # Replace with the desired output file name

generate_code(template, input_file, output_file)