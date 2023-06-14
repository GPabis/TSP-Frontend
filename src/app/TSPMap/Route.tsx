import {observer} from "mobx-react-lite";
import {Polyline} from "react-leaflet";
import {TSPMapState} from "./TSPMap.state";

interface PropsType {
  state: TSPMapState;
};

export const Route = observer<PropsType>((props) => {
    const {state} = props;

    return <Polyline positions={state.route} pathOptions={{color: 'black'}}/>
});
