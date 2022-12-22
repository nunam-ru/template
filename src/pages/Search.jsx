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
    const [query, setQuery] = useState(String);

    const [searchArtists, setSearchArtists] = useState(Array);
    const [moreArtistsLink, setMoreArtistsLink] = useState(String);

    const [searchAlbums, setSearchAlbums] = useState(Array);
    const [moreAlbumsLink, setMoreAlbumsLink] = useState(String);

    const [searchTracks, setSearchTracks] = useState(Array);
    const [moreTracksLink, setMoreTracksLink] = useState(String);

    const [isLoadingSearchArtists, setLoadingSearchArtists] = useState(Boolean);
    const [isLoadedSearchArtists, setLoadedSearchArtists] = useState(Boolean);

    const [isLoadingSearchAlbums, setLoadingSearchAlbums] = useState(Boolean);
    const [isLoadedSearchAlbums, setLoadedSearchAlbums] = useState(Boolean);

    const [isLoadingSearchTracks, setLoadingSearchTracks] = useState(Boolean);
    const [isLoadedSearchTracks, setLoadedSearchTracks] = useState(Boolean);

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
        setLoadedSearchArtists(true);
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
        setLoadedSearchAlbums(true);
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
        setLoadedSearchTracks(true);
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
                    <SearchArtists searchArtists={searchArtists} isLoading={isLoadingSearchArtists} isLoaded={isLoadedSearchArtists} moreArtistsLink={moreArtistsLink}/> 
                </section>

                <section className="albums">
                    <SearchAlbums searchAlbums={searchAlbums} isLoading={isLoadingSearchAlbums} isLoaded={isLoadedSearchAlbums} moreAlbumsLink={moreAlbumsLink}/> 
                </section>

                <section className="search__tracks">
                    <SearchTracks searchTracks={searchTracks} isLoading={isLoadingSearchTracks} isLoaded={isLoadedSearchTracks} moreTracksLink={moreTracksLink}/> 
                </section>
            </div>  
        </main>
    )
}