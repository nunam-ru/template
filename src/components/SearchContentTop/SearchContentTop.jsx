import React from 'react';

const SearchContentTop = ({text, moreArtistsLink, moreAlbumsLink, moreTracksLink}) => { 

    return (
        <>
            {text.toString() !== '' ?
                <div className="content__top">
                    <h1 className="search__content__topHeader">
                        Search results for "{text}"
                    </h1>

                    <nav className="navlist__more">
                        <ul className="navlist__items">
                            <li className="navlist__item">
                                <a href="#/" className="navlist__activeLink link">
                                            Top Results
                                </a>
                            </li>
                            <li className="navlist__item">
                                <a href={moreArtistsLink} className="navlist__link link artists_link">
                                            Artists 
                                </a>
                            </li>
                            <li className="navlist__item">
                                <a href={moreAlbumsLink} className="navlist__link link albums_link">
                                            Albums 
                                </a>
                            </li>
                            <li className="navlist__item">
                                <a href={moreTracksLink} className="navlist__link link tracks_link">
                                            Tracks 
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div> 
                : '' 
            }
        </>
    );
};

export default SearchContentTop;
