import json

from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import spacy

spacy = spacy.load("en_core_web_sm")

hg_model_hub_name = "ynie/roberta-large-snli_mnli_fever_anli_R1_R2_R3-nli"
max_length = 256
tokenizer = AutoTokenizer.from_pretrained(hg_model_hub_name)
model = AutoModelForSequenceClassification.from_pretrained(hg_model_hub_name)


def open_json_file(filename):
    with open(filename) as f:
        data_json = json.load(f)
        return data_json


def sent_in_summary(summary, sentences):
    list_of_decisions = []
    for smu in sentences:
        tokenized_input_seq_pair = tokenizer.encode_plus(summary, smu,
                                                         max_length=max_length,
                                                         return_token_type_ids=True, truncation=True)

        input_ids = torch.Tensor(tokenized_input_seq_pair['input_ids']).long().unsqueeze(0)

        # remember bart doesn't have 'token_type_ids', remove the line below if you are using bart.
        token_type_ids = torch.Tensor(tokenized_input_seq_pair['token_type_ids']).long().unsqueeze(0)
        attention_mask = torch.Tensor(tokenized_input_seq_pair['attention_mask']).long().unsqueeze(0)

        outputs = model(input_ids,
                        attention_mask=attention_mask,
                        token_type_ids=token_type_ids,
                        labels=None)
        # Note:
        # "id2label": {
        #     "0": "entailment",
        #     "1": "neutral",
        #     "2": "contradiction"
        # },

        predicted_probability = torch.softmax(outputs[0], dim=1)[0].tolist()  # batch_size only one

        list_of_decisions.append(predicted_probability[0] > 0.5)

    return list_of_decisions


def filter_sgus(input, outputfile_name):
    outputDict = []

    for i in input:
        print(i['instance_id'])
        list_of_correct_sent = sent_in_summary(i['summary'], i['sgus'])
        # print(list_of_correct_sent)
        list_of_sents = [value1 for value1, value2 in zip(i['sgus'], list_of_correct_sent) if value2]

        outputDict.append(
            {'instance_id': i['instance_id'],
             'summary': i['summary'],  # example['summary'],
             'sgus': list_of_sents, }
        )

    jsonString = json.dumps(outputDict)
    jsonFile = open(outputfile_name, "w")
    jsonFile.write(jsonString)
    jsonFile.close()


if __name__ == '__main__':
    # filter_sgus(open_json_file('eval_interface/src/data/pyrxsum/pyrxsum-sgus-curie.json'),
    #             'eval_interface/src/data/pyrxsum/pyrxsum-sgus-curie-filtered.json')
    filter_sgus(open_json_file('eval_interface/src/data/pyrxsum/pyrxsum-sgus-davinci.json'),
                'eval_interface/src/data/pyrxsum/pyrxsum-sgus-davinci-filtered.json')

    filter_sgus(open_json_file('eval_interface/src/data/realsumm/realsumm-sgus-curie.json'),
                'eval_interface/src/data/realsumm/realsumm-sgus-curie-filtered.json')
    filter_sgus(open_json_file('eval_interface/src/data/realsumm/realsumm-sgus-davinci.json'),
                'eval_interface/src/data/realsumm/realsumm-sgus-davinci-filtered.json')