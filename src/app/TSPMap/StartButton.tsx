import {observer} from "mobx-react-lite";
import {TSPMapState} from "./TSPMap.state";

interface PropsType {
    state: TSPMapState;
}

export const StartButton = observer((props: PropsType) => {
    const {state} = props;

    return <div
        style={{zIndex: 10000}}
        className='flex absolute bottom-4 right-1'
    >
        <button
            className='pb-4 pt-4 pl-12 pr-12 mr-2 relative border-2 rounded-md border-solid border-slate-500 bg-slate-100'
            onClick={() => state.resetPoints()}
        >
        Reset Points
        </button>
        <button
            style={{zIndex: 10000}}
            onClick={() => state.findRoute()}
            className='pb-4 pt-4 pl-12 pr-12 relative border-2 rounded-md border-solid border-slate-500 bg-slate-100'
        >
            {state.loading ? 'Loading...' : state.disallowRequest ? 'Not Allowed' :  'Start' }
        </button>
    </div>
});