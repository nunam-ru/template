import { useEffect } from 'react';
import { search } from '../server/search.js'
import '../search.css';


export const Search = () => {

    useEffect(() => {
        search();
    });
    

    return (
        <main>
            <div className="content__top">
                
                <h1 className="search__content__topHeader">
                    Search results for "Lorem ipsum dolor sit amet"
                </h1>
    
                <nav className="navlist__more">
                    <ul className="navlist__items">
                        <li className="navlist__item">
                            <a href="/#" className="navlist__activeLink link">
                                        Top Results
                            </a>
                        </li>
                        <li className="navlist__item">
                            <a href="/#" className="navlist__link link artists_link">
                                        Artists 
                            </a>
                        </li>
                        <li className="navlist__item">
                            <a href="/#" className="navlist__link link albums_link">
                                        Albums 
                            </a>
                        </li>
                        <li className="navlist__item">
                            <a href="/#" className="navlist__link link tracks_link">
                                        Tracks 
                            </a>
                        </li>
                    </ul>
                </nav>
            
            </div>

            <div className ="search_container">
                <form className="search__form">
                    <input className="search__field" type="text" name="q" placeholder="Search for music…" required/>
                    <button className="search__reset" type="reset">Reset</button>
                    <button className="search__submit" type="submit">Search</button>
                </form>
            </div>

            <div className="search__content">

                <section className="artists">
                    <h2 className="textColour__container">
                        <a href="/#" className="textColour__link link artists_link">
                            Artists
                        </a>
                    </h2>
                    <div className="loading_artists">Loading...</div>
                    <ol className="grid__items searchArtists hidden">
                        
                    </ol>
        
                    <p className="more__container">
                        <a href="/#" className="more__link link artists_link more_artists">More artists...</a>
                    </p>
                    
                </section> 

                <section className="albums">
                    <h2 className="textColour__container">
                        <a href="/#" className="textColour__link link albums_link">
                            Albums
                        </a>
                    </h2>
                    <div className="loading_albums">Loading...</div>
                    <ol className="grid__items searchAlbums hidden">
                        
                    </ol>
        
                    <p className="more__container">
                        <a href="/#" className="more__link link albums_link more_albums">More albums...</a>
                    </p>
                    
                </section>

                <section className="search__tracks">
                    <h2 className="textColour__container">
                        <a href="/#" className="textColour__link link tracks_link">
                            Tracks
                        </a>
                    </h2>
                    <div className="loading_chart">Loading...</div>
                    <table className="chartlist hidden">
                        <tbody>
                            
                        </tbody>
                    </table>

                    <p className="more__container">
                        <a href="/#" className="more__link link tracks_link more_tracks">More tracks...</a>
                    </p>

                </section>
            </div>
        </main>
    )
}