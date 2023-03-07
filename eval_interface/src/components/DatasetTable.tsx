import DataUnitTable from "./DataUnitTable";
import React from "react";
import {loadData} from "./loadData";

interface Props {
    dataset: string
    isDetailOpen: boolean
    metric: string
    subgraph: string
}

const DatasetTable = (props: Props) => {
    const {dataset, isDetailOpen, metric, subgraph} = props;

    const {scus, stus, smus, acc} = loadData(subgraph, dataset);

    return (
        <div className='table-wrapper'>
            {scus.map((ex, ind) => (
                <DataUnitTable key={ex.instance_id} ex={ex} ind={ind} isDetailOpen={isDetailOpen} scus={scus}
                               stus={stus} smus={smus} acc={acc} metric={metric}/>
            ))}
        </div>
    );
};

export default DatasetTable;
