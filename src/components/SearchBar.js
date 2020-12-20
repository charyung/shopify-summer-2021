import React from 'react';
import axios from 'axios';
import { uniqBy } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function SearchBar(props) {
    let typingTimer = null;

    const search = (str) => {
        props.setSearchStr(str);

        axios.get(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&s=${str}&type=movie`)
            .then((res) => props.setSearchRes(uniqBy(res.data.Search, "imdbID")));
    }

    return (
        <div className="component flex items-center">
            <FontAwesomeIcon icon={faSearch} size="lg" className="mx-2"/>
            <input
                className="flex-1"
                placeholder="Search for a movie"
                onChange={(e) => {
                    const searchString = e.target.value;

                    if (searchString.length < 1) return;

                    // Wait a bit before searching to avoid spamming api
                    if (typingTimer) clearTimeout(typingTimer);

                    typingTimer = setTimeout(() => { search(searchString); }, 1000);
                }}
            />
        </div>
        
    )
}

export default SearchBar;