import json

#file_path = 'eval_interface/src/data/stus_rose(Source)/samsum_stus.txt'
#summary_path = 'eval_interface/src/data/stus_rose(Source)/samsum.target'
#output_file_path = 'eval_interface/src/data/samsum/samsum-stus.json'
file_path = 'eval_interface/src/data/stus_rose(Source)/cnndm.target'
summary_path = 'eval_interface/src/data/stus_rose(Source)/cnndm.target'
output_file_path = 'eval_interface/src/data/cnndm/cnndm_test_stus.json'
#file_path = 'eval_interface/src/data/stus_rose(Source)/xsum_stus.txt'
#summary_path = 'eval_interface/src/data/stus_rose(Source)/xsum.target'
#output_file_path = 'eval_interface/src/data/xsum/xsum-stus.json'
data = []

with open(file_path, 'r') as file:
    lines = file.readlines()

with open(summary_path, 'r') as summary_file:
    summaries = summary_file.readlines()

for i, line in enumerate(lines):
    entry = {
        "instance_id": f"cnndm-{i}",
        "summary": summaries[i].strip(),
        #"stus": [text.strip() for text in line.split('\t')]
        "stus": [text.strip() for text in line.split('.  ')] # for cnndm
    }
    data.append(entry)

# Save data as JSON to a new file
with open(output_file_path, 'w') as output_file:
    json.dump(data, output_file, indent=2)

print(f"Data saved to {output_file_path}.")