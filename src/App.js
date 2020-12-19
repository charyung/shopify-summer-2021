import React, { useState } from 'react';

import SearchResultItem from './components/SearchResultItem';
import SearchBar from './components/SearchBar';
import ViewSwitch from './components/ViewSwitch'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faFolderOpen } from '@fortawesome/free-regular-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import './App.css';

function App() {
    const [searchRes, setSearchRes] = useState(null);
    const [nomItems, setNomItems] = useState(new Map());
    const [view, setView] = useState(false); // list = false, grid = true

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
        <div className="p-16 h-screen flex flex-col bg-gray-50">
            <SearchBar setSearchRes={setSearchRes} />

            <div className="flex m-2">
                <div className="flex-1">a</div>
                <ViewSwitch view={view} setView={setView} />
            </div>

            <div className="flex flex-1">
                <div
                    className="component flex-1"
                >
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
                        searchRes.map(res => (
                            <SearchResultItem data={res} key={res.imdbID} onClick={toggleMovieNomination} disabled={nomItems.size >= 5 || nomItems.has(res.imdbID)} nominated={nomItems.has(res.imdbID)} />
                        ))
                    )}
                </div>

                <div
                    className="component flex-1"
                >
                    {nomItems.size === 0 ?
                        <div className="blankComponentText">
                            <FontAwesomeIcon icon={faStar} size="3x" className="text-black"/>
                            <div className="m-1">You haven't nominated any items yet.</div>
                        </div>
                        :
                        Array.from(nomItems.values()).map(res => (
                            <SearchResultItem data={res} key={res.imdbID} onClick={toggleMovieNomination} nominated={true} disabled={false} />
                        ))
                    }
                </div>
            </div>

            
        </div>
    );
}

export default App;
