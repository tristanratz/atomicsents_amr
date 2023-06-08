import openai
import json
import pandas as pd

ft_model = 'gpt-4' # 'davinci:ft-personal-2023-02-08-09-42-43' # ft-yWG8yb5cL8E1du9igUeaFk4O

def get_samplefile_path(ds, fn = None):
    print('Load sample data', ds,'...')
    return "../../data/" + ds + ".jsonl"

def get_path(ds, fn = None):
    print('Load data', ds,'...')
    return "../../eval_interface/src/data/" + ds + "/" + (fn if fn != None else ds + "-scus") + ".json"

def get_save_path(ds, fn = None):
    print('Save data', ds,'...')
    return "../../eval_interface/src/data/" + ds + "/" + (fn if fn != None else ds + "-sgus-davinci") + ".json"


def generate(ds, sample_file=None, nr_samples=1, instruction=False, save_name=None):
    fn = get_path(ds)
    with open(fn) as f:
        dataset = []
        d = json.load(f)
        for idx, s in enumerate(d):
            print(idx, "/", len(d), "samples")
            sample = { "summary": s["summary"], "instance_id": s["instance_id"] }
            prompt = ""
            if sample_file is not None:
                samples = []
                with open(get_samplefile_path(sample_file), 'r') as sf:
                    for sam in sf:
                        samples.append(json.loads(sam))
            if instruction:
                prompt += "split this text into small sentences: "
            prompt += s["summary"].replace('<t> ','').replace(' </t>','').replace(" . ", ". ")
            messages=[
                {"role": "system", "content": "You split the provided input in small sentences separated by an #. The split sentences represent subsentences of the original sentence."},
            ]

            for samp in samples[0:nr_samples]:
                messages.append({"role": "user", "content": samp["prompt"]})
                messages.append({"role": "assistant", "content": samp["completion"]})
            messages.append(
                {"role": "user", "content": prompt}
            )
            res = openai.ChatCompletion.create(
                model=ft_model, 
                temperature=0,
                messages=messages
            )
            sample['sgus'] = res['choices'][0]['message']["content"].replace(" END\n", "").lstrip().replace(" . ", ". ").split(" # ")
            dataset.append(sample)
        json.dump(dataset, open(get_save_path(ds, save_name), "w"))

for dataset in ["realsumm", "pyrxsum"]:
    generate(dataset, sample_file="gpt_training_chat_full", nr_samples=1, instruction=False, save_name=dataset + "gpt4_ctx_oneshot")