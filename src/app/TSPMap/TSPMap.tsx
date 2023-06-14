import {MapContainer, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {useContext, useState} from "react";
import {observer} from "mobx-react-lite";
import {Markers} from "./Markers";
import {Route} from "./Route";
import {PointsCounter} from "./PointsCounter";
import {DistancePanel} from "./DistancePanel";
import {StartButton} from "./StartButton";
import {AlgorithmSelect} from "./AlgorithmSelect";
import {TSPMapState} from "./TSPMap.state";
import {AppContext} from "../../store/appStore";
import {Navigate} from "@tanstack/router";
import {GuestPanel} from "./GuestPanel";

export const TSPMap = observer(() =>  {
    const {auth} = useContext(AppContext)
    const [state] = useState(() => new TSPMapState(auth.username === 'Guest'));

    if(!auth.isAuth) return <Navigate to='/auth' />

    return <div className="h-screen w-screen relative">
        <PointsCounter state={state}/>
        <DistancePanel state={state}/>
        <AlgorithmSelect state={state}/>
        <StartButton state={state}/>
        <GuestPanel/>
        <MapContainer center={[50.0496, 19.9445]} zoom={10} scrollWheelZoom={false} className='h-full w-full z-5'>
            <TileLayer attribution="https://www.openstreetmap.org/copyright" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            <Markers state={state}/>
            <Route state={state}/>
        </MapContainer>
    </div>
});
export default TSPMap;
