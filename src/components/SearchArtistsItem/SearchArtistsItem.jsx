import React from 'react';

const SearchArtistsItem = ({url, image, name, listeners, statName}) => {
    return (
        <li className="grid__item">
            <div className="cover">
                <a href={url} className="cover_imageLink link">
                    <div className="cover__imageContainer">
                        <img className="cover__image" src={image} alt={name} loading="lazy"/>
                    </div>
                </a> 
                <div className="grid__itemDetails">
                    <p className="grid__itemMainText">
                        <a href={url} className="grid__itemLink link">{name}</a> 
                    </p>
                    <p className="grid__itemAuxText">
                        {listeners.toLocaleString("en-EN")} 
                        <span className="stat__name">
                                 {" "+statName}
                        </span>
                    </p>
                </div>
            </div>
        </li>
    );
};

export default SearchArtistsItem;
