import React from "react";
import '../App.css';

interface Props {
    scus: string[]
    smus: string[]
    trees: string[]
    stus: string[]
    accSMUs: number
    accSTUs: number
    stu_pos: number[][]
    smu_pos: number[][]
    isDetailOpen: boolean
    isFiltered: boolean
}

export function TableElements(props: Props) {
    const {scus, smus, trees, stus, accSMUs, accSTUs, stu_pos, smu_pos, isDetailOpen, isFiltered} = props;

    const max = isFiltered ? Math.max(scus.length) : Math.max(scus.length, smus.length, stus.length, trees.length);
    const output = [];
    // If there is some line break missing in the tree the method adds it
    const repairTree = (tree: string, length: number, i: number) => {
        console.log(tree);
        const xy = length > i && tree.split(':').map((leave, index) => {
            if (index === 0) {
                return leave
            }
            if (!leave.includes("\n")) {
                leave += "\n"
            }
            return ':' + leave
        }).join('');
        console.log(xy);
        return xy
    };

    for (let i = 0; i < max; i++) {
        const tree = isFiltered ? repairTree(trees[smu_pos[i][0]], smu_pos.length, i) : repairTree(trees[i], trees.length, i);
        isFiltered ? output.push(
            <tr key={i}>
                <td>{scus.length > i ? scus[i] : ''}</td>
                <td>{stu_pos.length > i ? stus[stu_pos[i][0]] : ''}</td>
                {isDetailOpen && <td>{stu_pos.length > i ? stu_pos[i][1].toFixed(3) : ''}</td>}
                <td>{smu_pos.length > i ? smus[smu_pos[i][0]] : ''}</td>
                {isDetailOpen && <td>{smu_pos.length > i ? smu_pos[i][1].toFixed(3) : ''}</td>}
                {isDetailOpen && <td className="trees">{smu_pos.length > i ? tree : ''}</td>}
            </tr>
            ) :
            output.push(
                <tr key={i}>
                    <td>{scus.length > i ? scus[i] : ''}</td>
                    <td>{stus.length > i ? stus[i] : ''}</td>
                    <td>{smus.length > i ? smus[i] : ''}</td>
                    {isDetailOpen && <td className="trees">{trees.length > i ? tree : ''}</td>}
                </tr>
            )
    }
    return (
        <table>
            <tr>
                <th>SCUs</th>
                <th>{`STUs, \n${accSTUs.toFixed(3)} Easiness`}</th>
                {isDetailOpen && isFiltered && <th>STU scores</th>}
                <th>{`SMUs,\n${accSMUs.toFixed(3)} Easiness`}</th>
                {isDetailOpen && isFiltered && <th>SMU scores</th>}
                {isDetailOpen && <th>SMU trees</th>}
            </tr>
            {output}
        </table>
    );
}