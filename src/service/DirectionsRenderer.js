export default function displayRoute(points, service, display, travelMode) {
  const waypoints = points.map(p => ({
      location: { lat: p.lat, lng: p.lng },
      stopover: true
    }))
  const origin = waypoints.shift().location;
  const destination = waypoints.pop().location;
  service.route({
          origin: origin,
          destination: destination,
          waypoints: waypoints,
          travelMode: travelMode,
        })
        .then((result) => {
          display.setDirections(result);
        })
        .catch((e) => {
          alert("Could not display directions due to: " + e);
        });
}