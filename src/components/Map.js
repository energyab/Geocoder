import React, {useRef, useEffect, useState} from "react"
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import displayRoute from "../service/DirectionsRenderer"

const render = (status=Status) => {
  if (status === Status.LOADING) return <h3>{status} ..</h3>;
  if (status === Status.FAILURE) return <h3>{status} ...</h3>;
  return null;
};

function MapComponent({
  center,
  zoom,
  list,
  setMarkerList
}) {
  const [mapa, setMapa] = useState(null)
  const [display, setDisplay] = useState(null)
  const ref = useRef();
  const useGoogle = window.google.maps
  const directionsService = new useGoogle.DirectionsService();
  // const geocoder = new useGoogle.Geocoder()

  // async function processArray(array) {
  //   let testArr = [];
  //   let bufferpoint ={}
  //   for (const item of array) {
  //         await geocoder
  //         .geocode({ placeId: item.place_id })
  //         .then(({ results }) => {
  //           bufferpoint = {
  //             lat: results[0].geometry.location.lat(),
  //             lng: results[0].geometry.location.lng()
  //           }
  //           testArr.push(bufferpoint)
  //         })
  //   }
  //   return testArr
  // }

  useEffect(() => {
    setMapa(new useGoogle.Map(ref.current, {
      center,
      zoom,
      }));
  }, []);

  if (!display) {
    setDisplay(new useGoogle.DirectionsRenderer({
      draggable: true,
      }));
    }

  useEffect(() => {
    if (!mapa){
      return
    }
    useGoogle.event.clearListeners(mapa, 'click')
    mapa.addListener("click", (e) => {
        setMarkerList([...list, {lat: e.latLng.lat(), lng: e.latLng.lng()}])
    });
    display.setMap(mapa)
    displayRoute(
      list,
      directionsService,
      display,
      useGoogle.TravelMode.WALKING
    )
    // if (display.__e3_) {
    //   return
    // }

    // display.addListener("directions_changed", () => {
    //   let routing = display.getDirections();
    //   // if (routing.geocoded_waypoints) {
    //   //   let getArray = processArray(routing.geocoded_waypoints)
    //   //   getArray.then((result) => {
    //   //      console.log(result)
    //   //   })
    //   //   }
    //   })
  },[mapa, list, useGoogle.event, setMarkerList] )

  return <div ref={ref} id="map" />;
}

function AppMap({list, setMarkerList}) {
  const center = { lat: 39.196006150830996, lng: -94.51784236736928 };
  const zoom = 10;

  return (
    <Wrapper apiKey="API KEY HERE" render={render}>
      <MapComponent center={center} zoom={zoom} list={list} setMarkerList={setMarkerList}/>
    </Wrapper>
  );
}

export default AppMap;