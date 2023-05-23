import {observer} from "mobx-react-lite";
import {AppState} from "./App.state";
import {Polyline} from "react-leaflet";

interface PropsType {
  state: AppState;
};

export const Route = observer<PropsType>((props) => {
    const {state} = props;

    return <Polyline positions={state.route} pathOptions={{color: 'black'}}/>
});
