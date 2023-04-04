# Extracting Atomic Sentences from AMRs

## Environment

The easiest way to proceed is to create a conda environment:
```
conda create -n atomicamr python=3.8
```

Further, install PyTorch and dependencies:

```
conda activate atomicamr
conda install pytorch==1.7.0 torchvision cudatoolkit=10.2 -c pytorch
pip install -r requirements.txt
python -m spacy download en_core_web_sm
git clone https://github.com//ablodge/amr-utils
pip install ./amr-utils
pip install ./amrlib
```

Generate sentences from subgraphs extracted from AMRs:
```
python atomic_amr.py
```


## Run pipeline
0) prep data to generate json files with right format
1) run atomic_amr.py (to generate smus)
2) run intrinsic_evaluation.py (for evalinterface to compare scu stu and scu)
3) run extrinsic_evaluation.py (to get the correlation between gold rank and smu rank)


sg2: Subgraph2 + subgraph if subgraph2 is empty and nli check against golden summary

sg3: subgraph3 (split at root, split at and options, remove time and location) and nli check against golden summary

sg3-v2: Subgraph3 (split at root and at first level leaves, split at and options, remove time, location, topic, purpose and source) and nli check against golden summary

sg3-v3: Subgraph3 add split after predicat 

sg4: Split at predicate, use tf to generate new shorter trees, remove all args, split at and, remove duplicates, filter > 3

sg4-v2: Same as sg4 but only take 7 shortest sentences of the generated smus

sg5: take person and combine it with every other part of the sentence