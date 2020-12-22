import React, { useState } from 'react';

import MovieListing from './components/MovieListing';
import SearchBar from './components/SearchBar';
import ViewSwitch from './components/ViewSwitch'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faFolderOpen } from '@fortawesome/free-regular-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import logo from './logo.svg';
import './App.css';

function App() {
    const [searchStr, setSearchStr] = useState(null)
    const [searchRes, setSearchRes] = useState(null);
    const [nomItems, setNomItems] = useState(new Map());
    const [isGrid, setView] = useState(true); // list = false, grid = true

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
            <img src={logo} alt="logo" className="mx-auto xl:w-2/6" />
            <SearchBar setSearchRes={setSearchRes} setSearchStr={setSearchStr} />

            <div className="flex align-middle">
                <div className={`flex-1 bg-yellow-300 m-2 p-3 rounded align-middle ${nomItems.size < 5 && "invisible"}`}>Thank you for voting!</div>
                <ViewSwitch isGrid={isGrid} setView={setView} />
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
                            <div className="m-1">You haven't nominated any items yet &ndash; Click the star next to an item to nominate it.</div>
                        </div>
                        :
                        <>
                            <h3>Nominations: {nomItems.size}/5</h3>
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
