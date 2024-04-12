import DataUnitTable from "./DataUnitTable";
import React from "react";
import {loadData} from "./loadData";

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

    return (
        <div className='table-wrapper'>
            {scus.map((ex, ind) => (
                <DataUnitTable key={ex.instance_id} ex={ex} ind={ind} isDetailOpen={isDetailOpen} scus={scus}
                               stus={stus} smus={smus} acc={acc} metric={metric} isFiltered={isFiltered}/>
            ))}
        </div>
    );
};

export default DatasetTable;
