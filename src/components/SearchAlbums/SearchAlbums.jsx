import React from 'react';
import SearchAlbumsItem from '../SearchAlbumsItem/SearchAlbumsItem';

const SearchAlbums = ({searchAlbums, isLoading, moreAlbumsLink}) => {
    
    if (!isLoading && !searchAlbums.length) {
        return (
            <>
            <h2 className="textColour__container">
                <a href="#/" className="textColour__link link albums_link">
                    Albums
                </a>
            </h2>
            <div className="loading_albums">Not found</div>
            </>
        );
    }

    while (!searchAlbums.length && isLoading === true) {
        return (
            <>
            <h2 className="textColour__container">
                <a href="#/" className="textColour__link link albums_link">
                    Albums
                </a>
            </h2>
            <div className="loading_albums">Loading...</div>
            </>
        );
    }

    while (searchAlbums.length && isLoading === true) {
        return (
            <div className="loading_albums">Loading...</div>
        );
    }

    return (
        <>  
            {searchAlbums.length !== 0 ?
                <h2 className="textColour__container">
                    <a href={moreAlbumsLink} className="textColour__link link albums_link">
                        Albums
                    </a>
                </h2> 
                : '' 
            }
            <ol className="grid__items searchAlbums">
                {searchAlbums.map((album) => <SearchAlbumsItem
                    key={album.album}
                    url={album.url}
                    image={album.image}
                    artist={album.artist}
                    album={album.album}  
                />)}
            </ol> 
            {searchAlbums.length !== 0 ? 
                <p className="more__container">
                    <a href={moreAlbumsLink} className="more__link link albums_link more_albums">More albums...</a>
                </p> : '' 
            }
        </>
    );
};

export default SearchAlbums;


