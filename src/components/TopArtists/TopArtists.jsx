import React from 'react';
import TopArtistsItem from "../TopArtistsItem/TopArtistsItem";

const TopArtists = ({topArtists, isLoading}) => {

    if (!isLoading && !topArtists.length) {
        return (
            <div className="loading_artists">Something went wrong. Try reload the page</div>
        );
    }

    while (isLoading === true) {
        return (
            <div className="loading_artists">Loading...</div>
        );
    }

    return (
        topArtists.map((artist) =>
                <TopArtistsItem
                    key={artist.name}
                    tags={artist.tags}
                    artist={artist.name}
                    url={artist.url}
                    image={artist.image}/>
            )
    );
};

export default TopArtists;
