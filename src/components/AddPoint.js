import React, {useState} from 'react';

const AddPoint = ({list, setMarkerList}) => {

	const [valueLat, setValueLat] = useState(undefined)
  	const [valueLng, setValueLng] = useState(undefined)

  	function handleChange (e) {
    	(e.target.name === "lat")?
      	setValueLat(e.target.value) : setValueLng(e.target.value)
 	}

 	function JoinMarker () {
	    let tmp = {lat: 0,lng: 0}
	    tmp.lat = +valueLat
	    tmp.lng = +valueLng
	    setMarkerList([...list, tmp])
  	}

	return (
		<div>
			<input 
				type="number"
				name="lat"
				value={valueLat} 
				onChange={handleChange}
			/>
			<input
				type="number"
				name="lng"
				value={valueLng} 
				onChange={handleChange}
			/>
			<button onClick={JoinMarker}> try </button>
		</div>
	)}

export default AddPoint;