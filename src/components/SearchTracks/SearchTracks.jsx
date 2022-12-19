import React from 'react';
import SearchTracksItem from '../SearchTracksItem/SearchTracksItem';

const SearchTracks = ({searchTracks, isLoading, moreTracksLink}) => {
    
    if (!isLoading && !searchTracks.length) {
        return (
            <>
            <h2 className="textColour__container">
                <a href={moreTracksLink} className="textColour__link link tracks_link">
                    Tracks
                </a>
            </h2>
            <div className="loading_tracks">Not found</div>
            </>
        );
    }

    while (!searchTracks.length && isLoading === true) {
        return (
            <>
            <h2 className="textColour__container">
                <a href={moreTracksLink} className="textColour__link link tracks_link">
                    Tracks
                </a>
            </h2>
            <div className="loading_tracks">Loading...</div>
            </>
        );
    }

    while (searchTracks.length && isLoading === true) {
        return (
            <div className="loading_tracks">Loading...</div>
        );
    }

    return (
        <>  
            {searchTracks.length !== 0 ?
                <h2 className="textColour__container">
                    <a href={moreTracksLink} className="textColour__link link tracks_link">
                        Tracks
                    </a>
                </h2> : '' 
            }
            <table className="chartlist">
                <tbody>
                {searchTracks.map((track) => <SearchTracksItem
                    key={track.name}
                    url={track.url}
                    image={track.image}
                    name={track.name}  
                    artist={track.artist}
                    artistUrl={track.artistUrl}
                />)}
                </tbody>
            </table>
            {searchTracks.length !== 0 ?
                <p className="more__container">
                    <a href={moreTracksLink} className="more__link link tracks_link more_tracks">More tracks...</a>
                </p> : '' 
            }
        </>
    );
};

export default SearchTracks;
