import React, {useState} from 'react';
import ScrollToTop from "react-scroll-to-top";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import './App.css';


import DatasetTable from "./components/DatasetTable";
import {Dataset, Metric, Subgraph} from "./components/Enums";
import Settings from "./components/Settings";

const App = () => {
    const [isDetailOpen, setIsDetailOpen] = useState(true);
    const [chosenDataset, setChosenDataset] = useState(Dataset.Realsumm.toString());
    const [chosenMetric, setChosenMetric] = useState(Metric.Rouge.toString());
    const [chosenSubgraph, setChosenSubgraph] = useState(Subgraph.SG4.toString());

    return (
        <div className="App">
            <div className="header">
                <h1>Evaluation interface</h1>
            </div>
            <div>
                <Settings isDetailOpen={isDetailOpen}
                          setIsDetailOpen={setIsDetailOpen}
                          chosenDataset={chosenDataset}
                          setChosenDataset={setChosenDataset}
                          chosenMetric={chosenMetric}
                          setChosenMetric={setChosenMetric}
                          chosenSubgraph={chosenSubgraph}
                          setChosenSubgraph={setChosenSubgraph}
                />
                <DatasetTable dataset={chosenDataset} isDetailOpen={isDetailOpen} metric={chosenMetric}
                              subgraph={chosenSubgraph}/>
            </div>
            <ScrollToTop smooth className="scroll-to-top" component={<ArrowUpwardIcon/>}/>
        </div>
    );
};

export default App;
