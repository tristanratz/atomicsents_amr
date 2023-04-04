import json


def open_json_file(filename):
    with open(filename) as f:
        data_json = json.load(f)
        return data_json


def create_json(name_of_source, name_of_output):
    outputDict = {}
    json_data = open_json_file(name_of_source)

    for i, labels in enumerate(json_data['annotations']):
        for system in labels:
            if i == 0:
                outputDict[system] = {i: labels[system]['acu']}
            else:
                outputDict[system][i] = labels[system]['acu']

    jsonString = json.dumps(outputDict)
    jsonFile = open(name_of_output, "w")
    jsonFile.write(jsonString)
    jsonFile.close()


# Create Json out of source CNNDM test source data
create_json('data/cnndm/cnndm_test.json', 'eval_interface/src/data/cnndm/cnndm_test-golden-labels.json')

# Create Json out of source CNNDM Val data
create_json('data/cnndm/cnndm_val.json', 'eval_interface/src/data/cnndm/cnndm_val-golden-labels.json')

# Create Json out of source XSUM data
create_json('data/xsum/xsum.json', 'eval_interface/src/data/xsum/xsum-golden-labels.json')

# Create Json out of source SAMSUM data
create_json('data/samsum/samsum.json', 'eval_interface/src/data/samsum/samsum-golden-labels.json')
