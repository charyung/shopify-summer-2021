import React, { useEffect, useState } from 'react';
import axios from 'axios';

import MovieListing from './components/MovieListing/MovieListing';
import SearchBar from './components/SearchBar/SearchBar';
import ViewSwitch from './components/ViewSwitch/ViewSwitch';
import LinkButton from './components/LinkButton/LinkButton';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faFolderOpen } from '@fortawesome/free-regular-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import logo from './logo.svg';
import './App.css';

function App() {
    const [searchStr, setSearchStr] = useState(null)
    const [searchRes, setSearchRes] = useState(null);
    const [nomItems, setNomItems] = useState(new Map());
    const [isGrid, setIsGrid] = useState(true);

    useEffect(() => {
        const urlParams = (new URL(window.location)).searchParams;
        const nominatedIds = urlParams.get("nominated").split(",");

        Promise.all(nominatedIds.map(id => (
            axios.get(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&i=${id}&type=movie`)
        )))
            .then(res => {
                setNomItems(prevState => {
                    const newNoms = new Map(prevState);
                    res.forEach(movie => newNoms.set(movie.data.imdbID, movie.data));
                    return newNoms;
                });
            });
    }, []);

    const toggleMovieNomination = (id, data) => {
        setNomItems(prevState => {
            const newNoms = new Map(prevState);
            if (nomItems.has(id)) {
                newNoms.delete(id);
            } else {
                newNoms.set(id, data);
            }
            return newNoms;
        });
    }

    return (
        <div className="p-4 lg:p-20 flex flex-col bg-gray-50 min-h-screen">
            <img src={logo} alt="logo" className="mx-auto mb-4 xl:w-2/6" />
            <SearchBar setSearchRes={setSearchRes} setSearchStr={setSearchStr} />

            <div className="flex align-middle">
                <div className={`flex-1 bg-yellow-300 m-2 p-3 rounded align-middle ${nomItems.size < 5 && "invisible"}`}>Thank you for voting!</div>
                <ViewSwitch isGrid={isGrid} setIsGrid={setIsGrid} />
            </div>

            <div className="flex flex-1 flex-col-reverse sm:flex-row">
                <div className="component flex-1">
                    {!searchRes &&
                        <div className="blankComponentText">
                            <FontAwesomeIcon icon={faSearch} size="3x" className="text-black"/>
                            <div className="m-1">Use the search bar to look for a movie you want to nominate!</div>
                        </div>
                    }
                    {!!searchRes && (searchRes.length === 0 ?
                        <div className="blankComponentText">
                            <FontAwesomeIcon icon={faFolderOpen} size="3x" className="text-black"/>
                            <div>There are no search results.</div>
                        </div>
                        :
                        <>
                            <h3>Search results for: "{searchStr}"</h3>
                            <div className={`flex-1 grid ${isGrid ? "md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"} transition-all`}>
                                {searchRes.map(res => (
                                    <MovieListing data={res} key={res.imdbID} onClick={toggleMovieNomination} disabled={nomItems.size >= 5 || nomItems.has(res.imdbID)} nominated={nomItems.has(res.imdbID)} isGrid={isGrid} />
                                ))}
                            </div>
                        </>
                    )}
                </div>

                <div className="component flex-1">
                    {nomItems.size === 0 ?
                        <div className="blankComponentText">
                            <FontAwesomeIcon icon={faStar} size="3x" className="text-black"/>
                            <div className="m-1">You haven't nominated any items yet. Click a movie to nominate it.</div>
                        </div>
                        :
                        <>
                            <div className="flex">
                                <h3 className="flex-1">Nominations: {nomItems.size}/5</h3>
                                <LinkButton nomItems={nomItems} />
                            </div>
                            <div className={`grid ${isGrid ? "md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"} transition-all`}>
                                {Array.from(nomItems.values()).map(res => (
                                    <MovieListing data={res} key={res.imdbID} onClick={toggleMovieNomination} nominated={true} disabled={false} isGrid={isGrid} />
                                ))}
                            </div>
                        </>
                        
                        
                    }
                </div>
            </div>

            
        </div>
    );
}

export default App;
