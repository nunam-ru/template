import React from 'react';

const TopTracksItem = ({track, tags, artist, image}) => {
    return (
        <li className="tracks__itemWrap">
                <div className="tracks__item">
                    <h3 className="tracks__itemName">
                        <a href={track.url} className="track link">{track.name}</a>
                    </h3>
                    <p className="tracks__artist">
                        <span>
                            <a href={artist.url} className="tracks__artistLink link">{artist.name}</a>
                        </span>
                    </p>
                    <section className="tracks__tags">
                        <ul className="tags-list">
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
                    <div className="tracks__mediaItem">
                        <span className="tracks__avatar">
                        <a href={track.url} className="link"><img className="tracks__img" src={image} alt="album avatar" loading="lazy"/></a>
                        </span>
                    </div>         
                </div>
            </li>
    );
};

export default TopTracksItem;
