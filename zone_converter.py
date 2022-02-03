import json
import os

ZONE_ID_WORLD = "301e1b69-7e13-11e8-8060-e284abfd2bc4"

ZONE_IDS_CONTINENTS = [
    "301e1f9b-7e13-11e8-8060-e284abfd2bc4", # Africa
    "301e2069-7e13-11e8-8060-e284abfd2bc4", # Asia
    "301e2106-7e13-11e8-8060-e284abfd2bc4", # Europe
    "301e2195-7e13-11e8-8060-e284abfd2bc4", # Middle East
    "301e2274-7e13-11e8-8060-e284abfd2bc4", # North America
    "301e237a-7e13-11e8-8060-e284abfd2bc4", # Oceania
    "301e243e-7e13-11e8-8060-e284abfd2bc4", # South America
]

LIST_OF_ALL_COUNTRIES = {}

print("301e243e-7e13-11e8-8060-e284abfd2bc4" in ZONE_IDS_CONTINENTS)

#with open("country_detail.json") as country_detail:
#    country_details = json.load(country_detail)
#    with open("zones.json") as json_file:
#        data = json.load(json_file)
#        for country in data:
#            id = -1
#            for country_detail_info in country_details:
#                if country_detail_info["name"] == country["name"]:
#                    id = country_detail_info["id"]
#            
#            
#
#            if country["parentId"] in ZONE_IDS_CONTINENTS:
#                if id == -1:
#                    print(country["name"])
#                LIST_OF_ALL_COUNTRIES({
#                    "zoneId": country["zoneId"],
#                    "parentId": country["parentId"],
#                    "name": country["name"],
#                    "geoId": id,
#                })
#
#print(LIST_OF_ALL_COUNTRIES)

zones_with_geoid =[]

with open("countries.json") as json_file:
    data = json.load(json_file)
    for country in data:
        country = data[country];
        zones_with_geoid.append(country)

print(zones_with_geoid);

with open("countries_as_list.json", 'w') as outfile:
    outfile.write(json.dumps(zones_with_geoid))