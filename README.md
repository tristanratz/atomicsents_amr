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


Run intrinsic evaluation:
```
python intrinsic_evaluation.py
```

Start Interface (TODO):
```
yarn start
```

Run extrinsic evaluation:
```
python extrinsic_evaluation.py
```