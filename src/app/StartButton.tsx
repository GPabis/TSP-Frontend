import {AppState} from "./App.state";
import {observer} from "mobx-react-lite";

interface PropsType {
    state: AppState;
}

export const StartButton = observer((props: PropsType) => {
    const {state} = props;

    return <div>
        <button
            disabled={state.routeIsReady}
            onClick={() => state.findRoute()}
            style={{zIndex: 10000}}
            className='pb-4 pt-4 pl-12 pr-12 absolute bottom-4 right-1 border-2 rounded-md border-solid border-slate-500 bg-slate-100'
        >
            Start
        </button>
    </div>
});