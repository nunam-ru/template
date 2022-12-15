/** API-ключ */
let apiKey = "edf462b7f6b5ebf41647281e15134d48";



/**
 * Функция отправки запроса по ссылке 
 * @param {string} link - Ссылка на API-метод
 * @returns {any} Данные с сервера 
 */
async function fetchElement(link) {
    try {
        const response = await fetch(link);
        const data = await response.json();
        return data;
    }
    catch (err) {
        alert(err.message + " - please reload the page");
        return err.message;
    }
}



/**
 * Функция получения чарта исполнителей
 * @returns {any} Данные с сервера 
 */
function getTopArtists() {
    return fetchElement(
        "https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=" + apiKey + "&format=json&limit=12");
}



/**
 * Функция получения тегов исполнителя по его имени
 * @param {string} artist - Имя исполнителя
 * @returns {any} Данные с сервера 
 */
async function getArtistTags(artist){
    const data = await fetchElement(
        "https://ws.audioscrobbler.com/2.0/?method=artist.gettoptags&artist=" + encodeURIComponent(artist) + "&api_key=" + apiKey + "&format=json");
    return data.toptags.tag.slice(0,3);
}



/**
 * Функция получения чарта треков
 * @returns {any} Данные с сервера 
 */
async function getTopTracks() {
    return fetchElement(
        "https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=" + apiKey + "&format=json&limit=15");
}



/**
 * Функция получения тегов трека по его названию и имени исполнителя
 * @param {string} artist - Имя исполнителя
 * @param {string} track - Название трека
 * @returns {any} Данные с сервера 
 */
async function getTrackTags(artist, track){
    const data = await fetchElement("https://ws.audioscrobbler.com/2.0/?method=track.gettoptags&artist=" + encodeURIComponent(artist) + "&track=" + encodeURIComponent(track) + "&api_key=" + apiKey + "&format=json");
    return data.toptags.tag.slice(0,3);
}



/**
 * Функция обработки полученных данных чарта артистов и их отображения на странице
 */
async function sendArtistsToUI() {
    let data = await getTopArtists();
    for (let i=0; i<12; i++) {
        const artist = data.artists.artist[i].name;
        let tags = await getArtistTags(artist);
        const url = data.artists.artist[i].url;
        const image = Object.values(data.artists.artist[i].image[2])[0];
        const template = `
            <li class="musicArtists__itemWrap">
                <div class="musicArtists__item">   
                    <section class="musicArtists__tags">
                        <ul class="tagsList">
                            <li class="tag">
                                <a href="${tags[0].url}" class="link" title="${tags[0].name}">${tags[0].name.toLowerCase()}</a>
                            </li>
                            <li class="tag">
                                <a href="${tags[1].url}" class="link" title="${tags[1].name}">${tags[1].name.toLowerCase()}</a>
                            </li>
                            <li class="tag">
                                <a href="${tags[2].url}" class="link" title="${tags[2].name}">${tags[2].name.toLowerCase()}</a>
                            </li>
                        </ul>
                    </section>
                <div class="mediaItem">
                    <span class="mediaItem__avatar">
                        <a href="${url}" class="musicArtist link"><img class="mediaItem__img" src="${image}" alt="artist avatar" loading="lazy"></a>
                    </span>
                    <h3 class="musicArtists__itemName">
                        <a href="${url}" class="musicArtist link">${artist}</a>
                    </h3>
                </div>
            </li>
            `;
        document.querySelector(".musicArtists").insertAdjacentHTML("beforeend", template);
    }
    document.querySelector(".musicArtists").classList.remove("hidden");
    document.querySelector(".loading_artists").remove();
}



/**
 * Функция обработки полученных данных чарта треков и их отображения на странице
 */
async function sendTracksToUI() {
    let data = await getTopTracks();
    for (let i=0; i<15; i++) {
        const track = data.tracks.track[i];
        const artist = data.tracks.track[i].artist;
        let tags = await getTrackTags(artist.name, track.name);
        if (tags.length < 3) {
            tags[1] = tags[0];
            tags[2] = tags[0];
        }
        const image = Object.values(data.tracks.track[i].image[2])[0];
        const template = `
            <li class="tracks__itemWrap">
                <div class="tracks__item">
                    <h3 class="tracks__itemName">
                        <a href="${track.url}" class="track link">${track.name}</a>
                    </h3>
                    <p class="tracks__artist">
                        <span>
                            <a href="${artist.url}" class="tracks__artistLink link">${artist.name}</a>
                        </span>
                    </p>
                    <section class="tracks__tags">
                        <ul class="tags-list">
                            <li class="tag">
                                <a href="${tags[0].url}" class="link" title="consectetur">${tags[0].name.toLowerCase()}</a>
                            </li>
                            <li class="tag">
                                <a href="${tags[1].url}" class="link" title="adipiscing">${tags[1].name.toLowerCase()}</a>
                            </li>
                            <li class="tag">
                                <a href="${tags[2].url}" class="link" title="elit">${tags[2].name.toLowerCase()}</a>
                            </li>
                        </ul>
                    </section>
                    <div class="tracks__mediaItem">
                        <span class="tracks__avatar">
                        <a href="${track.url}" class="link"><img class="tracks__img" src="${image}" alt="album avatar itemprop="image" loading="lazy"></a>
                        </span>
                    </div>         
                </div>
            </li>
        `
        document.querySelector(".tracks").insertAdjacentHTML("beforeend", template);
    }
    document.querySelector(".loading_tracks").remove();
    document.querySelector(".tracks").classList.remove("hidden");
}



/**
 * Основная функция
 */
export async function main() {
    sendArtistsToUI();
    sendTracksToUI();
}