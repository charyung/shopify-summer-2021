import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarHollow } from '@fortawesome/free-regular-svg-icons';

import './MovieListing.css';

function MovieListing(props) {
    return(
        <div
            className={`
                movieItem
                ${props.disabled && "opacity-50 hover:opacity-50"}
                ${props.nominated && "nominated"}`}>
            {props.isGrid && <img className="object-contain" alt={props.data.Title} src={props.data.Poster} />}
            <span className="flex-1">{props.data.Title} ({props.data.Year})</span>
            <button
                disabled={props.disabled}
                onClick={() => { props.onClick(props.data.imdbID, props.data) }}
                className="self-end justify-self-end">
                <span className="fa-layers fa-2x mt-1">
                    <FontAwesomeIcon
                        icon={faStarHollow}
                        className={`
                            ${props.nominated ? "text-yellow-400" : "text-gray-500"}
                            ${props.disabled && "opacity-0"}
                            break-words`}/>
                    <FontAwesomeIcon
                        icon={faStarSolid}
                        className={`
                            ${props.nominated ? "text-yellow-400" : "text-gray-500"}
                            ${props.disabled ?
                                "opacity-50 hover:opacity-50 cursor-default"
                                :
                                props.nominated ?
                                    "opacity-100 hover:opacity-0"
                                    :
                                    "opacity-5 hover:opacity-100"
                                    // ^ When switching from nominated=true to nominated=false, the colour doesn't get updated if the opacity is 0, so do 0.05 for next closest
                            }
                            break-words`}/>
                </span>
            </button>
            
            
        </div>
    )
}

export default MovieListing;