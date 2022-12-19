import { useState } from 'react';
import API from '../server/api';
import SearchForm from '../components/SearchForm/SearchForm';
import SearchArtists from '../components/SearchArtists/SearchArtists';
import SearchAlbums from '../components/SearchAlbums/SearchAlbums';
import SearchTracks from '../components/SearchTracks/SearchTracks';
import SearchContentTop from '../components/SearchContentTop/SearchContentTop';
import placeholder from '../media/placeholder.webp';
import '../search.css';


export const Search = () => {
    const [query, setQuery] = useState([]);

    const [searchArtists, setSearchArtists] = useState([]);
    const [moreArtistsLink, setMoreArtistsLink] = useState([]);

    const [searchAlbums, setSearchAlbums] = useState([]);
    const [moreAlbumsLink, setMoreAlbumsLink] = useState([]);

    const [searchTracks, setSearchTracks] = useState([]);
    const [moreTracksLink, setMoreTracksLink] = useState([]);

    const [isLoadingSearchArtists, setLoadingSearchArtists] = useState([]);
    const [isLoadingSearchAlbums, setLoadingSearchAlbums] = useState([]);
    const [isLoadingSearchTracks, setLoadingSearchTracks] = useState([]);

    async function fetchArtists(text) { 
        setLoadingSearchArtists(true);
        const {results: data} = await API.getSearchArtists(text);

        const artists = data.artistmatches.artist.map((artist) => {
            const listeners = parseInt(artist.listeners);
            let statName = "listeners";
            if (listeners % 10 === 1) { 
                statName = "listener";
            }
            let image = artist.image[3]['#text'];
            if (image === "") {
                image = placeholder;
            }
            return {
                name: artist.name, 
                url: artist.url,
                image: image,
                listeners: listeners, 
                statName: statName
            }
        })

        setMoreArtistsLink("https://www.last.fm/search/artists?q=" + text + "");
        setSearchArtists([...artists]);
        setLoadingSearchArtists(false);
    }

    async function fetchAlbums(text) { 
        setLoadingSearchAlbums(true);
        const {results: data} = await API.getSearchAlbums(text);

        const albums = data.albummatches.album.map((album) => {
            let image = album.image[3]['#text'];
            if (image === "") {
                image = placeholder;
            }
            return {
                album: album.name, 
                url: album.url,
                artist: album.artist,
                image: image
            }
        })

        setMoreAlbumsLink("https://www.last.fm/search/albums?q=" + text + "");
        setSearchAlbums([...albums]);
        setLoadingSearchAlbums(false);
    }

    async function fetchTracks(text) { 
        setLoadingSearchTracks(true);
        const {results: data} = await API.getSearchTracks(text);

        const tracks = data.trackmatches.track.map((track) => {
            let image = track.image[0]['#text'];
            if (image === "") {
                image = placeholder;
            }
            return {
                name: track.name, 
                url: track.url,
                artist: track.artist,
                artistUrl: track.url.substring(0, track.url.lastIndexOf("/")),
                image: image
            }
        })

        setMoreTracksLink("https://www.last.fm/search/tracks?q=" + text + "");
        setSearchTracks([...tracks]);
        setLoadingSearchTracks(false);
    }



    async function fetchSearch(text) {
        setQuery(text);
        await fetchArtists(text);
        await fetchAlbums(text);
        await fetchTracks(text);
    }
    

    return (
        <main>
            <SearchContentTop text={query} moreArtistsLink={moreArtistsLink} moreAlbumsLink={moreAlbumsLink} moreTracksLink={moreTracksLink}/>
            
            <div className="search_container">
                <SearchForm search={fetchSearch}/>
            </div>
            <div className="found_content">
                <section className="artists">
                    <SearchArtists searchArtists={searchArtists} isLoading={isLoadingSearchArtists} moreArtistsLink={moreArtistsLink}/> 
                </section>

                <section className="albums">
                    <SearchAlbums searchAlbums={searchAlbums} isLoading={isLoadingSearchAlbums} moreAlbumsLink={moreAlbumsLink}/> 
                </section>

                <section className="search__tracks">
                    <SearchTracks searchTracks={searchTracks} isLoading={isLoadingSearchTracks} moreTracksLink={moreTracksLink}/> 
                </section>
            </div>  
        </main>
    )
}