import {observer} from "mobx-react-lite";
import {useContext} from "react";
import {AppContext} from "../../store/appStore";

export const GuestPanel = observer(() => {
    const {auth} = useContext(AppContext);

    if(auth.username === 'Guest') {
        return <div style={{zIndex: 10000}}
            className='pb-4 pt-4 pl-4 pr-4 absolute bottom-1 left-1 border-2 rounded-md border-solid border-slate-500 bg-slate-100'>
            <h4 className='font-bold' >Guest users have limited access to the application.</h4>
            <p>Limited Branch and Bound algorithm up to <strong>25</strong> points on the map</p>
            <p>Limited Lin Kernighan algorithm up to <strong>150</strong> points on the map</p>
            <p>Limited Ant Colony algorithm up to <strong>100</strong> points on the map</p>
        </div>
    }

    return null;
});