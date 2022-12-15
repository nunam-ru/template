import { useEffect } from 'react';
import { main } from '../server/script.js'
import '../index.css';

export const Music = () => {
    
    useEffect(() => {
        main();
    });

    return (
        <main>
            <h1 className="content__topHeader">
                Music
            </h1>

            <h2 className="musicArtists__header">Hot right now</h2>

            <div className="container">
                <div className="loading_artists">Loading...</div>
                <ol className="musicArtists hidden" id="artists">
                        
                </ol>

                <h2 className="tracks__header">Popular tracks</h2>
                <div className="loading_tracks">Loading...</div>
                <ol className="tracks hidden" id="tracks">
                     
                </ol>
            </div>
        </main>
    )
}