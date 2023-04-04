import json


def open_json_file(filename):
    with open(filename) as f:
        data_json = json.load(f)
        return data_json


def create_json(name_of_source, name_of_output, name_of_instance):
    outputDict = []
    json_data = open_json_file(name_of_source)

    for i, system_summary in enumerate(json_data['system_outputs']):
        output_Temp = {'instance_id': name_of_instance + "-" + str(i)}
        for sys_sum in system_summary:
            output_Temp[sys_sum] = system_summary[sys_sum]

        outputDict.append(output_Temp)

    jsonString = json.dumps(outputDict)
    jsonFile = open(name_of_output, "w")
    jsonFile.write(jsonString)
    jsonFile.close()


# Create Json out of source CNNDM test source data
create_json('data/cnndm/cnndm_test.json', 'eval_interface/src/data/cnndm/cnndm_test-system-summary.json', 'cnndm_test')

# Create Json out of source CNNDM Val data
create_json('data/cnndm/cnndm_val.json', 'eval_interface/src/data/cnndm/cnndm_val-system-summary.json', 'cnndm_val')

# Create Json out of source XSUM data
create_json('data/xsum/xsum.json', 'eval_interface/src/data/xsum/xsum-system-summary.json', 'xsum')

# Create Json out of source SAMSUM data
create_json('data/samsum/samsum.json', 'eval_interface/src/data/samsum/samsum-system-summary.json', 'samsum')
