import React, {useState} from 'react';
import AppMap from './components/Map';
import MarkerList from './components/MarkerList';
import AddPoint from './components/AddPoint';
import './App.css';

const App = () => {
  const [markerList, setMarkerList] = useState([
    {lat: 42.80943987931396, lng: -106.3391306199613},
    {lat: 40.96116500697511, lng: -96.62721722285038},
    {lat: 43.673765538693964, lng: -96.78102580606256},
    {lat: 43.114952562361005, lng: -89.39821381187868}
  ])

  return (
    <div className="App">
        <AppMap list={markerList} setMarkerList={setMarkerList} />
        <div className="routing">
          <AddPoint list={markerList} setMarkerList={setMarkerList} />
          <MarkerList list={markerList} setMarkerList={setMarkerList} />
        </div>
    </div>
  );
}

export default App;
