import React from 'react';
import SearchArtistsItem from '../SearchArtistsItem/SearchArtistsItem';

const SearchArtists = ({searchArtists, isLoading, isLoaded, moreArtistsLink}) => {
    return (
        <>
        {isLoading 
        ? 
        <>
            <h2 className="textColour__container">
                    <a href={moreArtistsLink} className="textColour__link link artists_link">
                        Artists
                    </a>
            </h2> 
            <div className="loading_artists">Loading...</div>
        </>
        : 
            <>
            {isLoaded 
            ?   
            <>
                <h2 className="textColour__container">
                    <a href={moreArtistsLink} className="textColour__link link artists_link">
                        Artists
                    </a>
                </h2> 

                {searchArtists.length === 0 ? <div className="loading_artists">Not found</div> : '' }
            </>
            : '' }

            <ol className="grid__items searchArtists">
                {searchArtists.map((artist) => <SearchArtistsItem
                    key={artist.name}
                    url={artist.url}
                    image={artist.image}
                    name={artist.name}  
                    listeners={artist.listeners}
                    statName={artist.statName}
                />)}
            </ol> 

            {searchArtists.length !== 0 ? 
                <p className="more__container">
                    <a href={moreArtistsLink} className="more__link link artists_link more_artists">More artists...</a>
                </p>    
                : '' 
            }
            </>
        }
        </>
    );
};

export default SearchArtists;


