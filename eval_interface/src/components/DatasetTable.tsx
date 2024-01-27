import DataUnitTable from "./DataUnitTable";
import React from "react";
import {loadData} from "./loadData";

import accPyrxsumNgram from '../data/pyrxsum/pyrxsum-acc-ngrams.json'
import accPyrxsumSent from '../data/pyrxsum/pyrxsum-acc-sents.json'
import accPyrxsumSmu2 from '../data/pyrxsum/pyrxsum-acc-smus-sg2.json'
import accPyrxsumSmu4 from '../data/pyrxsum/pyrxsum-acc-smus-sg4-plus-v10.json'
import accPyrxsumgpt3 from '../data/pyrxsum/pyrxsum-acc_gpt-3.5-turbo_ctx_oneshot.json'
import accPyrxsumgpt4 from '../data/pyrxsum/pyrxsum-acc_gpt-4_ctx_oneshot.json'
import accPyrxsumSTU from '../data/pyrxsum/pyrxsum-acc-stus.json'

import accrealsummNgram from '../data/realsumm/realsumm-acc-ngrams.json'
import accrealsummSent from '../data/realsumm/realsumm-acc-sents.json'
import accrealsummSmu2 from '../data/realsumm/realsumm-acc-smus-sg2.json'
import accrealsummSmu4 from '../data/realsumm/realsumm-acc-smus-sg4-plus-v10.json'
import accrealsummgpt3 from '../data/realsumm/realsumm-acc_gpt-3.5-turbo_ctx_oneshot.json'
import accrealsummgpt4 from '../data/realsumm/realsumm-acc_gpt-4_ctx_oneshot.json'
import accrealsummSTU from '../data/realsumm/realsumm-acc-stus.json'

import acctac09Ngram from '../data/tac09/tac09-acc-ngrams.json'
import acctac09Sent from '../data/tac09/tac09-acc-sents.json'
import acctac09Smu2 from '../data/tac09/tac09-acc-smus-sg2.json'
import acctac09Smu4 from '../data/tac09/tac09-acc-smus-sg4-plus-v10.json'
import acctac09gpt3 from '../data/tac09/tac09-acc_gpt-3.5-turbo_ctx_oneshot.json'
import acctac09gpt4 from '../data/tac09/tac09-acc_gpt-4_ctx_oneshot.json'
import acctac09STU from '../data/tac09/tac09-acc-stus.json'

/*
import accPyrxsumNgram from '../data/pyrxsum/pyrxsum-acc-ngrams-reverse.json'
import accPyrxsumSent from '../data/pyrxsum/pyrxsum-acc-sents-reverse.json'
import accPyrxsumSmu2 from '../data/pyrxsum/pyrxsum-acc-smus-sg2-reverse.json'
import accPyrxsumSmu4 from '../data/pyrxsum/pyrxsum-acc-smus-sg4-plus-v10-reverse.json'
import accPyrxsumgpt3 from '../data/pyrxsum/pyrxsum-acc_gpt-3.5-turbo_ctx_oneshot-reverse.json'
import accPyrxsumgpt4 from '../data/pyrxsum/pyrxsum-acc_gpt-4_ctx_oneshot-reverse.json'
import accPyrxsumSTU from '../data/pyrxsum/pyrxsum-acc-stus-reverse.json'

import accrealsummNgram from '../data/realsumm/realsumm-acc-ngrams-reverse.json'
import accrealsummSent from '../data/realsumm/realsumm-acc-sents-reverse.json'
import accrealsummSmu2 from '../data/realsumm/realsumm-acc-smus-sg2-reverse.json'
import accrealsummSmu4 from '../data/realsumm/realsumm-acc-smus-sg4-plus-v10-reverse.json'
import accrealsummgpt3 from '../data/realsumm/realsumm-acc_gpt-3.5-turbo_ctx_oneshot-reverse.json'
import accrealsummgpt4 from '../data/realsumm/realsumm-acc_gpt-4_ctx_oneshot-reverse.json'
import accrealsummSTU from '../data/realsumm/realsumm-acc-stus-reverse.json'

import acctac09Ngram from '../data/tac09/tac09-acc-ngrams-reverse.json'
import acctac09Sent from '../data/tac09/tac09-acc-sents-reverse.json'
import acctac09Smu2 from '../data/tac09/tac09-acc-smus-sg2-reverse.json'
import acctac09Smu4 from '../data/tac09/tac09-acc-smus-sg4-plus-v10-reverse.json'
import acctac09gpt3 from '../data/tac09/tac09-acc_gpt-3.5-turbo_ctx_oneshot-reverse.json'
import acctac09gpt4 from '../data/tac09/tac09-acc_gpt-4_ctx_oneshot-reverse.json'
import acctac09STU from '../data/tac09/tac09-acc-stus-reverse.json'*/

interface Props {
    dataset: string
    isDetailOpen: boolean
    metric: string
    subgraph: string
    isFiltered: boolean
}

const DatasetTable = (props: Props) => {
    const {dataset, isDetailOpen, metric, subgraph, isFiltered} = props;

    const {scus, stus, smus, acc} = loadData(subgraph, dataset);

    const getAverage = (accValue: any[]) => {
        let amountBertSMU = 0;
        let sumBertSMU = 0;
        let amountRougeSMU = 0;
        let sumRougeSMU = 0;
        let amountBertSTU = 0;
        let sumBertSTU = 0;
        let amountRougeSTU = 0;
        let sumRougeSTU = 0;
        accValue.forEach((val) => {
            if (val["easiness-smus-acc-bert"]) {
                sumBertSMU += val["easiness-smus-acc-bert"][0]
                amountBertSMU += 1
                console.log(val["easiness-smus-acc-bert"][0], typeof (val["easiness-smus-acc-bert"][0]), sumBertSMU, amountBertSMU)

            }
            if (val["easiness-smus-acc-rouge"]) {
                amountRougeSMU += 1
                sumRougeSMU += val["easiness-smus-acc-rouge"]
            }
            if (val["easiness-stus-acc-bert"]) {
                sumBertSTU += val["easiness-stus-acc-bert"]
                amountBertSTU += 1
            }
            if (val["easiness-stus-acc-rouge"]) {
                amountRougeSTU += 1
                sumRougeSTU += val["easiness-stus-acc-rouge"]
            }
        })
        const avgBertSMU = (sumBertSMU / amountBertSMU).toFixed(2);
        const avgRougeSMU = (sumRougeSMU / amountRougeSMU).toFixed(2);
        const avgBertSTU = (sumBertSTU / amountBertSTU).toFixed(2);
        const avgRougeSTU = (sumRougeSTU / amountRougeSTU).toFixed(2);
        console.log("rouge: " + avgRougeSMU + " bert: " + avgBertSMU + ' If STu exists in file than non zero: r, b' + avgRougeSTU + avgBertSTU)
        return "rouge: " + avgRougeSMU + " bert: " + avgBertSMU
    }

    return (
        <div>
            <div>

                'accrealsummSent'+{getAverage(accrealsummSent)}+ <br/>
                'accrealsummNgram'+{getAverage(accrealsummNgram)}+ <br/>
                'accrealsumm(STU)'+{getAverage(accrealsummSTU)} + <br/>
                'accrealsummSMU2'+{getAverage(accrealsummSmu2)} + <br/>
                'accrealsummSMU4'+{getAverage(accrealsummSmu4)} + <br/>
                'accrealsummgpt3'+{getAverage(accrealsummgpt3)}+ <br/>
                'accrealsummgpt4'+{getAverage(accrealsummgpt4)}+ <br/><br/>

                'accPyrxsumSent'+{getAverage(accPyrxsumSent)}+ <br/>
                'accPyrxsumNgram'+{getAverage(accPyrxsumNgram)}+ <br/>
                'pyrxsum(STU)'+{getAverage(accPyrxsumSTU)} + <br/>
                'pyrxsumSMU2'+{getAverage(accPyrxsumSmu2)} + <br/>
                'pyrxsumSMU4'+{getAverage(accPyrxsumSmu4)} + <br/>
                'accPyrxsumgpt3'+{getAverage(accPyrxsumgpt3)}+ <br/>
                'accPyrxsumgpt4'+{getAverage(accPyrxsumgpt4)}+ <br/> <br/>

                'acctac09Sent'+{getAverage(acctac09Sent)}+ <br/>
                'acctac09Ngram'+{getAverage(acctac09Ngram)}+ <br/>
                'acctac09STU'+{getAverage(acctac09STU)} + <br/>
                'acctac09SMU2'+{getAverage(acctac09Smu2)} + <br/>
                'acctac09SMU4'+{getAverage(acctac09Smu4)} + <br/>
                'acctac09gpt3'+{getAverage(acctac09gpt3)}+ <br/>
                'acctac09gpt4'+{getAverage(acctac09gpt4)}+ <br/>
            </div>
            <div className='table-wrapper'>
                {scus.map((ex, ind) => (
                    <DataUnitTable key={ex.instance_id} ex={ex} ind={ind} isDetailOpen={isDetailOpen} scus={scus}
                                   stus={stus} smus={smus} acc={acc} metric={metric} isFiltered={isFiltered}/>
                ))}
            </div>
        </div>
    );
};

export default DatasetTable;
