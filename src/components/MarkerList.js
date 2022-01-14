import React from 'react';

const MarkerList = ({list, setMarkerList}) => {
	let cmarker = {}

	function dragStartHandler(e, marker) {
	    cmarker = marker
	}

	function dragEndHandler(e, marker) {
	    e.target.style.background = '#fff'
	}

	function dragOverHandler(e, marker) {
	    e.preventDefault()
	    e.target.style.background = '#E5F0F1'
	}

	function dropHandler(e, marker) {
	    e.preventDefault()
	    e.target.style.background = '#fff'
	    setMarkerList(list.map(cur => {
	        if (cur===marker) {
	          return cur=cmarker
	        }
	        if (cur===cmarker) {
	          return cur=marker
	        }
	        return cur
	    }))
	}


	function deleteHandler(id) {
	    if ( list.length >2 ) {
	     return setMarkerList(list.filter(del => del !== id));
	    }
	    alert('cant delete points, route can calculate on 2 points min')
	}

	return (
		<div>
	    	{list.map(marker =>
	            <div 
	            onDragStart={(e) => dragStartHandler(e, marker)}
	            onDragLeave={(e) => dragEndHandler(e)}
	            onDragEnd={(e) => dragEndHandler(e)}
	            onDragOver={(e) => dragOverHandler(e)}
	            onDrop={(e) => dropHandler(e, marker)}           
	            className="marker"
	            key={marker.lng} 
	            draggable={true}>
	            {`${marker.lat} ${marker.lng}`}
	            <button onClick={() => deleteHandler(marker)}> X </button>
            	</div>
        	)}
        </div>
)}

export default MarkerList;