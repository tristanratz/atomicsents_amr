import json


def open_json_file(filename):
    with open(filename) as f:
        data_json = json.load(f)
        return data_json


def create_json(name_of_source, name_of_output, name_of_instance):
    outputDict = []
    json_data = open_json_file(name_of_source)

    for i, golden_summary in enumerate(json_data['reference']):
        outputDict.append(
            {
                'instance_id': name_of_instance + "-" + str(i),
                'summary': golden_summary,
                'scus': json_data['reference_acus'][i],
            }
        )

    jsonString = json.dumps(outputDict)
    jsonFile = open(name_of_output, "w")
    jsonFile.write(jsonString)
    jsonFile.close()


# Create Json out of source CNNDM test source data
create_json('data/cnndm/cnndm_test.json', 'eval_interface/src/data/cnndm/cnndm_test-scus.json', 'cnndm_test')

# Create Json out of source CNNDM Val data
create_json('data/cnndm/cnndm_val.json', 'eval_interface/src/data/cnndm/cnndm_val-scus.json', 'cnndm_val')

# Create Json out of source XSUM data
create_json('data/xsum/xsum.json', 'eval_interface/src/data/xsum/xsum-scus.json', 'xsum')

# Create Json out of source SAMSUM data
create_json('data/samsum/samsum.json', 'eval_interface/src/data/samsum/samsum-scus.json', 'samsum')
