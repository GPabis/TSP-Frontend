import {AppState} from "./App.state";
import {observer} from "mobx-react-lite";

interface PropsType {
    state: AppState;
}

export const PointsCounter = observer((props: PropsType) => {
    const {state} = props;

    return <div style={{zIndex: 10000}} className='absolute top-1 right-1 p-2 bg-slate-300 border-2 rounded-md border-solid border-slate-500'>
        <p>
            Points: {state.points.length}
        </p>
    </div>

});