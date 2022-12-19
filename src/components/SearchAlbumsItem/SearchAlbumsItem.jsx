import React from 'react';

const SearchAlbumsItem = ({url, image, artist, album}) => {
    return (
        <li className="grid__item">
                <div className="cover">
                    <a href={url} className="cover_imageLink link">
                        <div className="cover__imageContainer">
                            <img className="cover__image" src={image} alt={artist} loading="lazy"/>
                        </div>
                    </a>
                    <div className="grid__itemDetails">
                        <p className="grid__itemMainText">
                            <a href={url} className="grid__itemLink link">{album}</a> 
                        </p>
                        <p className="grid__itemAuxText">
                            <a href={url.slice(0, url.lastIndexOf('/'))} className="grid__itemLink link">{artist}</a> 
                        </p>
                    </div>
                </div>
            </li>
    );
};

export default SearchAlbumsItem;
