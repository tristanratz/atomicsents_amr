import React, {useState} from "react";
import {Collapse} from 'react-collapse';

import IconButton from '@mui/material/IconButton';
import {Stack} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import {TableElements} from "./TableElements";
import {Metric} from "./Enums";


interface Props {
    ex: any
    ind: any
    isDetailOpen: boolean
    acc: any[]
    scus: any[]
    stus: any[]
    smus: any[]
    metric: string
}

const DataUnitTable = (props: Props) => {
    const [isOpen, setIsOpen] = useState(true);
    const {ex, ind, isDetailOpen, scus, stus, smus, acc, metric} = props;

    let accSMUs;
    let accSTUs;
    let stu_pos;
    let smu_pos;

    switch (metric) {
        case Metric.Bert: {
            accSMUs = acc[ind]["easiness-smus-acc-bert"];
            accSTUs = acc[ind]["easiness-stus-acc-bert"];
            stu_pos = acc[ind]["stus-pos-bert"];
            smu_pos = acc[ind]["smus-pos-bert"];
            break;
        }
        default: {
            accSMUs = acc[ind]["easiness-smus-acc-rouge"];
            accSTUs = acc[ind]["easiness-stus-acc-rouge"];
            stu_pos = acc[ind]["stus-pos-rouge"];
            smu_pos = acc[ind]["smus-pos-rouge"];
            break;
        }
    }

    const trees_table = (ind: number) => {
        const sentences: string[] = [];
        const trees: string[] = [];
        smus[ind].summary_trees.forEach((sum_tree: string) => {
            const str = sum_tree.toString();
            sentences.push(str.slice(0, str.indexOf('\n')));
            trees.push(str.slice(str.indexOf('\n') + 1));
        });
        return (
                <table>
                    <tr>
                        {sentences.map((sent) => {
                            return <td key={sent}>{sent}</td>
                        })}
                    </tr>
                    {isDetailOpen&&(<tr className='tree-table'>{
                        trees.map((tree) => {
                            return <td key={tree}>{tree}</td>
                        })}
                    </tr>)}
                </table>
        )
    };

    return (
        <div className='instance' key={`${ind}${metric}`}>
            <Stack direction="row">
                <h4>{ex.instance_id}</h4>
                <IconButton aria-label="collapse" onClick={() => setIsOpen(!isOpen)}
                            color="primary">
                    {isOpen ? <KeyboardArrowDownIcon/> : <KeyboardArrowRightIcon/>}
                </IconButton>
            </Stack>
            <Collapse isOpened={isOpen}>
                <table key={ex.instance_id}>
                    <tr className='table-title'>
                        <th className='table-head-title'>{ex.summary.replaceAll("<t>", "").replaceAll("</t>", "")}</th>
                    </tr>
                    {trees_table(ind)}
                </table>
                <TableElements
                    scus={scus[ind].scus}
                    smus={smus[ind].smus}
                    trees={smus[ind].tree}
                    stus={stus[ind].stus}
                    accSMUs={accSMUs}
                    accSTUs={accSTUs}
                    stu_pos={stu_pos}
                    smu_pos={smu_pos}
                    isDetailOpen={isDetailOpen}
                />
            </Collapse>
        </div>
    );
};

export default DataUnitTable;