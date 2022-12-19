import React from 'react';

const TopArtistsItem = ({tags, artist, url, image}) => {
    return (
        <li className="musicArtists__itemWrap">
                <div className="musicArtists__item">   
                    <section className="musicArtists__tags">
                        <ul className="tagsList">
                            <li className="tag">
                                <a href={tags[0].url} className="link" title={tags[0].name}>{tags[0].name.toLowerCase()}</a>
                            </li>
                            <li className="tag">
                                <a href={tags[1].url} className="link" title={tags[1].name}>{tags[1].name.toLowerCase()}</a>
                            </li>
                            <li className="tag">
                                <a href={tags[2].url} className="link" title={tags[2].name}>{tags[2].name.toLowerCase()}</a>
                            </li>
                        </ul>
                    </section>
                    <div className="mediaItem">
                    <span className="mediaItem__avatar">
                        <a href={url} className="musicArtist link"><img className="mediaItem__img" src={image} alt="artist avatar" loading="lazy"/></a>
                    </span>
                    <h3 className="musicArtists__itemName">
                        <a href={url} className="musicArtist link">{artist}</a>
                    </h3>
                    </div>
                </div>
            </li>
    );
};

export default TopArtistsItem;
