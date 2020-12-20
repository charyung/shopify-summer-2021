import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import './MovieListing.css';

function MovieListing(props) {
    return(
        <button onClick={() => { props.onClick(props.data.imdbID, props.data) }} disabled={props.disabled} className={`movieItem m-2 p-4 rounded text-left ${props.disabled ? "cursor-default" : "hover:opacity-60"} ${props.nominated && "nominated"}`}>
            {props.isGrid && <img className="object-contain" alt={props.data.Title} src={props.data.Poster} />}
            <span className="flex-1">{props.data.Title} ({props.data.Year})</span>
            <FontAwesomeIcon
                icon={faStar}
                size="lg"
                className={`${props.nominated ? "text-yellow-400" : "text-gray-500"} ${props.disabled && "opacity-50"} break-words`}/>
        </button>
    )
}

export default MovieListing;