import React, { useEffect, useState } from 'react';
import axios from 'axios';

import MovieListing from './components/MovieListing/MovieListing';
import SearchBar from './components/SearchBar/SearchBar';
import ViewSwitch from './components/ViewSwitch/ViewSwitch';
import LinkButton from './components/LinkButton/LinkButton';
import TextBanner from './components/TextBanner/TextBanner';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faFolderOpen } from '@fortawesome/free-regular-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import logo from './logo.svg';
import './App.css';

const MAX_NOMINATION_AMOUNT = 5;

function App() {
    const [searchStr, setSearchStr] = useState(null)
    const [searchRes, setSearchRes] = useState(null);
    const [nomItems, setNomItems] = useState(new Map());
    const [isGrid, setIsGrid] = useState(true);

    const [votingBannerVisible, setVotingBannerVisible] = useState(false);
    const [copyBannerVisible, setCopyBannerVisible] = useState(false);

    useEffect(() => {
        const urlParams = (new URL(window.location)).searchParams;
        const nominatedIds = urlParams.get("nominated")?.split(",");

        if (!nominatedIds || !nominatedIds[0]) return;

        Promise.all(nominatedIds.map(id => (
            axios.get(`https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&i=${id}&type=movie`)
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

    useEffect(() => {
        setVotingBannerVisible(nomItems.size === MAX_NOMINATION_AMOUNT);
    }, [nomItems]);

    return (
        <div className="p-4 lg:p-20 flex flex-col bg-gray-50 min-h-screen">
            <TextBanner text="Thank you for voting!" visible={votingBannerVisible} setVisibility={setVotingBannerVisible} backgroundColourClass="bg-yellow-300"/>
            <TextBanner text="Link copied." visible={copyBannerVisible} setVisibility={setCopyBannerVisible} />

            <img src={logo} alt="logo" className="mx-auto mb-4 xl:w-2/6" />
            <SearchBar setSearchRes={setSearchRes} setSearchStr={setSearchStr} />

            <div className="flex align-middle">
                <LinkButton nomItems={nomItems} setCopyBannerVisible={setCopyBannerVisible} />
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
                                    <MovieListing data={res} key={res.imdbID} onClick={toggleMovieNomination} disabled={nomItems.size >= MAX_NOMINATION_AMOUNT || nomItems.has(res.imdbID)} nominated={nomItems.has(res.imdbID)} isGrid={isGrid} />
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
                            <h3 className="flex-1">Nominations: {nomItems.size}/{MAX_NOMINATION_AMOUNT}</h3>
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
