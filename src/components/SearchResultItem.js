import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function SearchResultItem(props) {
    return(
        <div className="flex m-2 p-4 bg-gray-200 rounded hover:bg-gray-400 active:bg-gray-500">
            <span className="flex-1">{props.data.Title} ({props.data.Year})</span>
            <button onClick={() => { props.onClick(props.data.imdbID, props.data) }} disabled={props.disabled}>
                <FontAwesomeIcon
                    icon={faStar}
                    size="lg"
                    className={`${props.nominated ? "text-yellow-400" : "text-gray-500"} ${props.disabled && "opacity-50"}`}/>
            </button>
        </div>
    )
}

export default SearchResultItem;