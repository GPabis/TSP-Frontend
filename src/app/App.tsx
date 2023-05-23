import {MapContainer, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {useState} from "react";
import {AppState, MapPointType} from "./App.state";
import {observer} from "mobx-react-lite";
import {Markers} from "./Markers";
import {Route} from "./Route";
import {PointsCounter} from "./PointsCounter";
import {DistancePanel} from "./DistancePanel";
import {StartButton} from "./StartButton";



export const App = observer(() =>  {
  const [state] = useState(() => new AppState());

  return <div className="h-screen w-screen relative">
    <PointsCounter state={state}/>
    {state.distance !== undefined && <DistancePanel state={state}/>}
    <StartButton state={state}/>
    <MapContainer center={[50.0496, 19.9445]} zoom={10} scrollWheelZoom={false} className='h-full w-full z-5'>
      <TileLayer attribution="https://www.openstreetmap.org/copyright" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
      <Markers state={state}/>
      <Route state={state}/>
    </MapContainer>

  </div>
});
export default App;
