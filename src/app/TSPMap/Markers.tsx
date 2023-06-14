import { observer } from "mobx-react-lite"
import {MapPointType} from "../App.state";
import {Marker, Popup, useMapEvents} from "react-leaflet";
import {TSPMapState} from "./TSPMap.state";

interface PropsType {
    state: TSPMapState;
}
export const Markers = observer<PropsType>((props) => {
    const {state} = props;

    const map = useMapEvents({
        click: (e) => {
            if(state.routeIsReady === false) {
                const point: MapPointType = {
                    lat: e.latlng.lat,
                    lng: e.latlng.lng,
                    name: `[${state.points.length + 1}] ${e.latlng.lat}, ${e.latlng.lng}`,
                    nodeIndex: state.points.length + 1,
                    startingPoint: state.points.length === 0,
                    order: undefined,
                }
                state.addPoint(point)
                map.flyTo(e.latlng, map.getZoom());
            }
        },
    })

    return <>
        {state.points.map(point =>
        <Marker key={point.name} icon={state.setIcon(point.startingPoint)} position={[point.lat, point.lng]}>
            <Popup><p>{point.name}</p>
                {point.order !== undefined ? <p>Order: {point.order}</p> : null}
                <button
                    onClick={(event) => state.deletePoint(point, event)}
                    className='pb-2 pt-2 pl-6 pr-6 border-2 rounded-md border-solid border-slate-500 bg-slate-100'
                >
                    Delete
                </button>
                {!point.startingPoint && <button
                    onClick={(event) => state.setStartingPoint(point, event)}
                    className='pb-2 pt-2 pl-6 pr-6 border-2 rounded-md border-solid border-slate-500 bg-slate-100'
                >
                    Set As Starting Point
                </button>
                }
            </Popup>
        </Marker>) ?? null}
    </>
})