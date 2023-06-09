import {MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'node_modules/leaflet-geosearch/dist/geosearch.css';
import {useContext, useState, useEffect} from "react";
import {observer} from "mobx-react-lite";
import {Markers} from "./Markers";
import {Route} from "./Route";
import {PointsCounter} from "./PointsCounter";
import {DistancePanel} from "./DistancePanel";
import {StartButton} from "./StartButton";
import {AlgorithmSelect} from "./AlgorithmSelect";
import {MapPointType, TSPMapState} from "./TSPMap.state";
import {AppContext} from "../../store/appStore";
import {Navigate} from "@tanstack/router";
import {GuestPanel} from "./GuestPanel";
import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch'

interface SearchProps {
    provider: OpenStreetMapProvider,
    state: TSPMapState,
}
// make new leaflet element
const Search = observer((props: SearchProps) => {
    const map = useMap() // access to leaflet map
    const { provider, state } = props

    // @ts-ignore
    useEffect(() => {
        // @ts-ignore
        const searchControl = new GeoSearchControl({
            showMarker: false,
            provider,
        })
        map.addControl(searchControl)

        map.on('geosearch/showlocation', (e: any) => {
            if(state.points.some(point => point.lat === e.location.y && point.lng === e.location.x)) return;
            const point: MapPointType = {
                lat: e.location.y,
                lng: e.location.x,
                name: `[${state.points.length + 1}] ${e.location.y}, ${e.location.x}`,
                nodeIndex: state.points.length + 1,
                startingPoint: state.points.length === 0,
                order: undefined,
            }

            state.addPoint(point);
        });

        return () => map.removeControl(searchControl)

    }, [props])

    return null // don't want anything to show up from this comp
})


export const TSPMap = observer(() =>  {
    const {auth} = useContext(AppContext)
    const [state] = useState(() => new TSPMapState(auth.username === 'Guest'));

    if(!auth.isAuth) return <Navigate to='/auth' />

    return <><div className="h-screen relative">
        <PointsCounter state={state}/>
        <DistancePanel state={state}/>
        <AlgorithmSelect state={state}/>
        <StartButton state={state}/>
        <GuestPanel/>
        <MapContainer center={[50.0496, 19.9445]} zoom={10} scrollWheelZoom={false} className='h-full w-full z-5'>
            <TileLayer attribution="https://www.openstreetmap.org/copyright" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            <Markers state={state}/>
            <Route state={state}/>
            <Search provider={new OpenStreetMapProvider()} state={state} />
        </MapContainer>
    </div>
        <table className='table-auto w-full'>
            <thead className='bg-gray-200 text-gray-600'>
                <tr className='border-b-2 border-gray-400'>
                    <th>No.</th>
                    <th>Algorithm</th>
                    <th>Distance</th>
                    <th>Time</th>
                    <th>Points</th>
                </tr>
            </thead>
            <tbody className='text-center text-gray-600 border-b-2 border-gray-400'>
                {state.history.map((result, index) => <tr key={result.algorithm}>
                    <td className='w-16'>{index + 1}</td>
                    <td className='w-72'>{result.algorithm}</td>
                    <td className='w-40'>{result.distance}</td>
                    <td className='w-40'>{result.time}</td>
                    <td className='text-left max-w-0 text-xs'>{result.points}</td>
                </tr>)}
            </tbody>
        </table>
    </>
});
export default TSPMap;
