import {AppState} from "../App.state";
import {observer} from "mobx-react-lite";
import {TSPMapState} from "./TSPMap.state";

interface PropsType {
    state: TSPMapState;
}

export const DistancePanel = observer((props: PropsType) => {
    const {state} = props;

    return <div style={{zIndex: 10000}} className='absolute top-14 right-1 p-2 bg-slate-300 border-2 rounded-md border-solid border-slate-500'>
        <p>Distance: {state.distance} km</p>
        <p>Time: {state.time}ms</p>
    </div>
});