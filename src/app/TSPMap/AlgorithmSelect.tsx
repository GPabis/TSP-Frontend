import {observer} from "mobx-react-lite";
import {TSPMapState} from "./TSPMap.state";

interface PropsType {
    state: TSPMapState;
}

export const AlgorithmSelect = observer((props: PropsType) => {
    const {state} = props;

    return <div>
        <select
            onChange={(e) => state.setAlgorithm(e.target.value)}
            style={{zIndex: 10000}}
            className='pb-4 pt-4 absolute bottom-24 right-1 border-2 rounded-md border-solid border-slate-500 bg-slate-100'
        >
            <option defaultChecked value="antColonyAlgorithm">Ant Colony</option>
            <option value="branchAndBoundAlgorithm">Branch and Bound</option>
            <option value="linKernighanAlgorithm">Lin Kernighan</option>

        </select>
    </div>
});