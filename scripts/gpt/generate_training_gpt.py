import jsonlines
import json
import random

data = []

def load_json(fn):
    with open(fn) as f:
        d = json.load(f)
        for s in d:
            sample = {}
            sample['prompt'] = s["summary"] #"split this text into small sentences: " + s["summary"] + " ->"
            response = " "
            for id, scu in enumerate(s["scus"]):
                response = response + scu
                if id < len(s["scus"])-1:
                    response = response + " # "
                else:
                    response = response #+ " END\n"

            sample["completion"] = response
            data.append(sample)
            

def get_path(ds, fn = None):
    print('Load data', ds,'...')
    return "../../eval_interface/src/data/" + ds + "/" + (fn if fn != None else ds + "-scus") + ".json"


load_json(get_path("tac08", "tac2008-scus-sp-full"))
load_json(get_path("tac09", "tac2009-scus-sp-full"))

print("Shuffle data")
random.shuffle(data)

print("Write file...")
with open("../../data/gpt_training_chat_full.jsonl", "w") as fp:
    writer = jsonlines.Writer(fp) 
    writer.write_all(data)
    writer.close()

print("Successfully wrote file.")