import React from 'react';
import SearchAlbumsItem from '../SearchAlbumsItem/SearchAlbumsItem';

const SearchAlbums = ({searchAlbums, isLoading, isLoaded, moreAlbumsLink}) => {
    return (
        <>  
        {isLoading 
        ?
        <>
            <h2 className="textColour__container">
                    <a href={moreAlbumsLink} className="textColour__link link albums_link">
                        Albums
                    </a>
            </h2>
            <div className="loading_albums">Loading...</div>
        </>
        : 
        <>
            {isLoaded 
            ? 
            <>
                <h2 className="textColour__container">
                    <a href={moreAlbumsLink} className="textColour__link link albums_link">
                    Albums
                    </a>
                </h2> 

                {searchAlbums.length === 0 ? <div className="loading_albums">Not found</div> : '' }
            </>   
            : '' }

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
        } 
        </>
    );
};

export default SearchAlbums;


