import { useEffect, useState } from 'react';
import API from '../server/api';
import TopArtists from '../components/TopArtists/TopArtists.jsx';
import TopTracks from '../components/TopTracks/TopTracks.jsx';
import '../index.css';

export const Music = () => {

    const [topArtists, setArtists] = useState(Array)
    const [isLoadingArtists, setLoadingArtists] = useState(Boolean);

    const [topTracks, setTracks] = useState(Array)
    const [isLoadingTracks, setLoadingTracks] = useState(Boolean);

    async function fetchArtists() { 
        setLoadingArtists(true);
        const {artists} = await API.getTopArtists();

        const artist = await Promise.all(artists.artist.map(async (artist_item) => {
            const tags = await API.getArtistTags(artist_item.name);
            return {
                name: artist_item.name,
                tags: tags,
                image: artist_item.image[2]['#text'],
                url: artist_item.url,
            }
        }));
        
        setArtists([...artist]);
        setLoadingArtists(false);
    }

    async function fetchTracks() { 
        setLoadingTracks(true);
        const {tracks} = await API.getTopTracks();
        
        const track = await Promise.all(tracks.track.map(async (track_item) => {
            const tags = await API.getArtistTags(track_item.artist.name);
            if (tags.length < 3) {
                tags[1] = tags[0];
                tags[2] = tags[0];
            }
            return {
                track: track_item,
                tags: tags,
                artist: track_item.artist,
                image: track_item.image[2]['#text'],
                url: track_item.url,
            }
        }));

        setTracks([...track]);
        setLoadingTracks(false);
    }

    useEffect(() => {
        fetchArtists();
        fetchTracks();
    }, [])

    return (
        <main>
            <h1 className="content__topHeader">
                Music
            </h1>

            <h2 className="musicArtists__header">Hot right now</h2>

            <div className="container">
                <ol className="musicArtists" id="artists">
                    <TopArtists topArtists={topArtists} isLoading={isLoadingArtists}/>
                </ol>

                <h2 className="tracks__header">Popular tracks</h2>
                <ol className="tracks" id="tracks">
                    <TopTracks topTracks={topTracks} isLoading={isLoadingTracks}/>
                </ol>
            </div>
        </main>
    )
}


