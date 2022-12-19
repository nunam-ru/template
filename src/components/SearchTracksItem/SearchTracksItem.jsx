import React from 'react';

const SearchTracksItem = ({url, image, name, artist, artistUrl}) => {
    return (
            <tr className="chartlist__row">
                <td className="chartlist__play">
                    <a href={url} className="chartlist__playButton link"><div></div></a>
                </td>
                <td className="chartlist__image">
                    <a href={url} title="cover" className="cover link">
                        <img src={image} alt="track" loading="lazy"/>
                    </a>
                </td>
                <td className="chartlist__name">
                    <a href={url} title={name} className="link">{name}</a>
                </td>
                <td className="chartlist__artist">
                    <a href={artistUrl.substring(0, artistUrl.lastIndexOf('/'))} title={artist} className="link">{artist}</a>
                </td>
            </tr>   
    );
};

export default SearchTracksItem;
