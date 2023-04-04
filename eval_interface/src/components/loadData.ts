import scusPyrXsum from "../data/pyrxsum/pyrxsum-scus.json";
import scusRealsumm from "../data/realsumm/realsumm-scus.json";

import stusPyrXsum from "../data/pyrxsum/pyrxsum-stus.json";
import stusRealsumm from "../data/realsumm/realsumm-stus.json";

import smusSG2PyrXsum from "../data/pyrxsum/pyrxsum-smus-sg2.json";
import smusSG3PyrXsum from "../data/pyrxsum/pyrxsum-smus-sg3-v2.json";
import smusSG4PyrXsum from "../data/pyrxsum/pyrxsum-smus-sg4-plus-v9.json";
import smusSG2Realsumm from "../data/realsumm/realsumm-smus-sg2.json";
import smusSG3Realsumm from "../data/realsumm/realsumm-smus-sg3-v2.json";
import smusSG4Realsumm from "../data/realsumm/realsumm-smus-sg4-plus-v9.json";

import accSG2PyrXsum from "../data/pyrxsum/pyrxsum-acc-sg2.json";
import accSG3PyrXsum from "../data/pyrxsum/pyrxsum-acc-sg3-v2.json";
import accSG4PyrXsum from "../data/pyrxsum/pyrxsum-acc-sg4-plus-v9.json";
import accSG2Realsumm from "../data/realsumm/realsumm-acc-sg2.json";
import accSG3Realsumm from "../data/realsumm/realsumm-acc-sg3-v2.json";
import accSG4Realsumm from "../data/realsumm/realsumm-acc-sg4-plus-v9.json";

interface SCUSData {
    [key: string]: {
        instance_id: string;
        summary: string;
        scus: string[];
    }[];
}
const scusData: SCUSData = {
    "scusPyrXsum": scusPyrXsum,
    "scusRealsumm": scusRealsumm,
};

interface STUSData {
    [key: string]: {
        instance_id: string;
        summary: string;
        stus: string[];
    }[];
}
const stusData: STUSData = {
    "stusPyrXsum": stusPyrXsum,
    "stusRealsumm": stusRealsumm,
};

interface SMUSData {
    [key: string]: {
        instance_id: string;
        summary: string;
        summary_trees: string[];
        tree: string[];
        smus: string[];
    }[];
}
const smusData: SMUSData = {
    "smusSG2PyrXsum": smusSG2PyrXsum,
    "smusSG3PyrXsum": smusSG3PyrXsum,
    "smusSG4PyrXsum": smusSG4PyrXsum,
    "smusSG2Realsumm": smusSG2Realsumm,
    "smusSG3Realsumm": smusSG3Realsumm,
    "smusSG4Realsumm": smusSG4Realsumm,
};

interface ACCData {
    [key: string]: {
        instance_id: string;
        "easiness-stus-acc-rouge": number;
        "easiness-smus-acc-rouge": number;
        "stus-pos-rouge": number[][];
        "smus-pos-rouge": number[][];
        "easiness-stus-acc-bert": number;
        "easiness-smus-acc-bert": number;
        "stus-pos-bert": number[][];
        "smus-pos-bert": number[][];
    }[];
}
const accData: ACCData = {
    "accSG2PyrXsum": accSG2PyrXsum,
    "accSG3PyrXsum": accSG3PyrXsum,
    "accSG4PyrXsum": accSG4PyrXsum,
    "accSG2Realsumm": accSG2Realsumm,
    "accSG3Realsumm": accSG3Realsumm,
    "accSG4Realsumm": accSG4Realsumm,
};


export const loadData = (sg: string, dataset: string)=> {
    const scuString: string = `scus${dataset}`;
    const stuString: string = `stus${dataset}`;
    const smuString: string = `smus${sg}${dataset}`;
    const accString: string = `acc${sg}${dataset}`;
    return {scus : scusData[scuString],stus : stusData[stuString], smus: smusData[smuString], acc : accData[accString]};
}