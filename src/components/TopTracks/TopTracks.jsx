import React from 'react';
import TopTracksItem from "../TopTracksItem/TopTracksItem";

const TopTracks = ({topTracks, isLoading}) => {
    
    if (!isLoading && !topTracks.length) {
        return (
            <div className="loading_tracks">Something went wrong. Try reload the page</div>
        )
    }

    while (isLoading === true) {
        return (
            <div className="loading_tracks">Loading...</div>
        )
    }

    return (
        topTracks.map((track) =>
                <TopTracksItem
                    key={track.track.name}
                    track={track.track}
                    tags={track.tags}
                    artist={track.artist}
                    image={track.image}/>
            )
    );
};

export default TopTracks;
