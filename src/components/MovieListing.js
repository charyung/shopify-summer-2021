import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarHollow } from '@fortawesome/free-regular-svg-icons';

import './MovieListing.css';

function MovieListing(props) {
    return(
        <button
            disabled={props.disabled}
            onClick={() => { props.onClick(props.data.imdbID, props.data) }}
            className={`
                movieItem
                ${props.isGrid ? "gridView" : "listView"}
                ${props.disabled && "disabled opacity-50 cursor-default"}
                ${props.nominated && "nominated"}`}>
            {props.isGrid && <img className="object-contain" alt={props.data.Title} src={props.data.Poster} />}
            <span className="title self-center">{props.data.Title}</span>
            <span className="year text-gray-500 self-center justify-self-start leading-none">{props.data.Year}</span>
            <span className="star fa-layers fa-lg justify-self-end">
                <FontAwesomeIcon
                    icon={faStarHollow}
                    className={`
                        ${props.nominated ? "text-yellow-400" : "text-gray-500"}
                        ${props.disabled && "opacity-0"}
                        break-words`}/>
                <FontAwesomeIcon
                    icon={faStarSolid}
                    className={`
                        solidStar
                        ${props.nominated ? "nominated text-yellow-400" : "text-gray-500"}
                        ${props.disabled && "disabled"}
                        break-words`}/>
            </span>
        </button>
    )
}

export default MovieListing;