/**
 * API-ключ
 */
let apiKey = "edf462b7f6b5ebf41647281e15134d48";



/**
 * Функция получения значения параметра URL по его имени
 * @param {string} name - Название параметра
 * @param {string} url - URL
 * @returns {string} Значение параметра
 */
function getParameterByName(name, url) {
    name = name.replace(/[\[\]]/g, "\\$&");
    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) {return null;}
    if (!results[2]) {return "";}
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}



/** Переменная со значением поискового запроса */
const searchQuery = getParameterByName("q", window.location.href);



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
 * Функция поиска исполнителей по их имени
 * @param {string} artist - Имя исполнителя
 * @returns {any} Данные с сервера 
 */
function getSearchArtists(artist) {
    return fetchElement("https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=" + artist + "&api_key=" + apiKey + "&format=json&limit=8");
}



/**
 * Функция поиска альбомов по их названию
 * @param {string} album - название альбома
 * @returns {any} Данные с сервера 
 */
function getSearchAlbums(album) {
    return fetchElement("http://ws.audioscrobbler.com/2.0/?method=album.search&album=" + album + "&api_key=" + apiKey + "&format=json&limit=8");
}



/**
 * Функция поиска треков по их названию
 * @param {string} track - Название трека
 * @returns {any} Данные с сервера 
 */
function getSearchTracks(track) {
    return fetchElement("http://ws.audioscrobbler.com/2.0/?method=track.search&track=" + track + "&api_key=" + apiKey + "&format=json&limit=10");
}



/**
 * Функция обработки полученных данных артистов и их отображения на странице
 */
async function sendArtistsToUI() {
    let data = await getSearchArtists(searchQuery);
    for (let i=0; i<data.results.artistmatches.artist.length; i++) {
        const artist = data.results.artistmatches.artist[i].name;
        const listeners = parseInt(data.results.artistmatches.artist[i].listeners).toLocaleString("en-EN");
        let statName = "listeners";
        if (listeners % 10 == 1) { 
            statName = "listener";
        }
        const url = data.results.artistmatches.artist[i].url;
        let image = Object.values(data.results.artistmatches.artist[i].image[2])[0];
        image == "" ? image = "placeholder.webp" : image;
        const template = `
            <li class="grid__item">
                <div class="cover">
                    <a href="${url}" class="cover_imageLink link">
                        <div class="cover__imageContainer">
                            <img class="cover__image" src="${image}" alt="Image" loading="lazy">
                        </div>
                    </a> 
                    <div class="grid__itemDetails">
                        <p class="grid__itemMainText">
                            <a href="${url}" class="grid__itemLink link">${artist}</a> 
                        </p>
                        <p class="grid__itemAuxText">
                            ${listeners} 
                            <span class="stat__name">
                                ${statName}
                            </span>
                        </p>
                    </div>
                </div>
            </li>
            `;
        document.querySelector(".searchArtists").insertAdjacentHTML("beforeend", template);
    }
    document.querySelector(".searchArtists").classList.remove("hidden");
    if (data.results.artistmatches.artist.length == 0) {
        document.querySelector(".loading_artists").innerHTML = "Not found";
        document.querySelector(".more_artists").remove();
    }
    else {
        document.querySelector(".loading_artists").remove();
    }
}



/**
 * Функция обработки полученных данных альбомов и их отображения на странице
 */
async function sendAlbumsToUI() {
    let data = await getSearchAlbums(searchQuery);
    for (let i=0; i<data.results.albummatches.album.length; i++) {
        const album = data.results.albummatches.album[i].name;
        const artist = data.results.albummatches.album[i].artist;
        const url = data.results.albummatches.album[i].url;
        let image = Object.values(data.results.albummatches.album[i].image[3])[0];
        image == "" ? image = "placeholder.webp" : image;
        const template = `
            <li class="grid__item">
                <div class="cover">
                    <a href="${url}" class="cover_imageLink link">
                        <div class="cover__imageContainer">
                            <img class="cover__image" src="${image}" alt="Image" loading="lazy">
                        </div>
                    </a>
                    <div class="grid__itemDetails">
                        <p class="grid__itemMainText">
                            <a href="${url}" class="grid__itemLink link">${album}</a> 
                        </p>
                        <p class="grid__itemAuxText">
                            <a href="${url.slice(0, url.lastIndexOf('/'))}" class="grid__itemLink link">${artist}</a> 
                        </p>
                    </div>
                </div>
            </li>
            `;
        document.querySelector(".searchAlbums").insertAdjacentHTML("beforeend", template);
    }
    document.querySelector(".searchAlbums").classList.remove("hidden");
    if (data.results.albummatches.album.length == 0) {
        document.querySelector(".loading_albums").innerHTML = "Not found";
        document.querySelector(".more_albums").remove();
    }
    else {
        document.querySelector(".loading_albums").remove();
    }
}



/**
 * Функция обработки полученных данных треков и их отображения на странице
 */
async function sendTracksToUI() {
    let data = await getSearchTracks(searchQuery);
    for (let i=0; i<data.results.trackmatches.track.length; i++) {
        const track = data.results.trackmatches.track[i];
        const name = track.name;
        const url = track.url;
        const artist = track.artist;
        const artistUrl = url.substring(0, url.lastIndexOf("/"));
        let image = Object.values(track.image[0])[0];
        image == "" ? image = "placeholder.webp" : image;
        const template = `
            <table class="chartlist">
                <tbody>
                    <tr class="chartlist__row">
                        <td class="chartlist__play">
                            <a href="${url}" class="chartlist__playButton link"></a>
                        </td>
                        <td class="chartlist__image">
                            <a href="" title="cover" class="cover link">
                                <img src="${image}" alt="track" loading="lazy">
                            </a>
                        </td>
                        <td class="chartlist__name">
                            <a href="${url}" title="${name}" class="link">${name}</a>
                        </td>
                        <td class="chartlist__artist">
                            <a href="${artistUrl.substring(0, artistUrl.lastIndexOf('/'))}" title="${artist}" class="link">${artist}</a>
                        </td>
                    </tr>   
                </tbody>
            </table>
            `;
        document.querySelector(".chartlist").insertAdjacentHTML("beforeend", template);
    }
    document.querySelector(".chartlist").classList.remove("hidden");
    if (data.results.trackmatches.track.length == 0) {
        document.querySelector(".loading_chart").innerHTML = "Not found";
        document.querySelector(".more_tracks").remove();
    }
    else {
        document.querySelector(".loading_chart").remove();
    }
    }



/**
 * Основная функция, проверяет наличие поискового запроса. 
 * Если запрос отсутствует, то на странице остается только поле для его ввода.
 */
function main(){
    if (searchQuery == null) {
        document.querySelector(".content__topHeader").remove();
        document.querySelector(".content").remove();
        document.querySelector(".content__top").remove();
    }
    else {
        document.querySelector(".content__topHeader").innerText = "Search results for '" + searchQuery + "'";
        document.querySelector(".search__field").setAttribute("value", searchQuery);
        document.querySelector(".search__reset").onclick = function() {
            document.querySelector(".search__field").setAttribute("value", "");
        }

        for (let elem of document.querySelectorAll(".artists_link")) {
            elem.href = "https://www.last.fm/search/artists?q=" + searchQuery + "";
        }
        for (let elem of document.querySelectorAll(".albums_link")) {
            elem.href = "https://www.last.fm/search/albums?q=" + searchQuery + "";
        }
        for (let elem of document.querySelectorAll(".tracks_link")) {
            elem.href = "https://www.last.fm/search/tracks?q=" + searchQuery + "";
        }
        sendArtistsToUI();
        sendAlbumsToUI();
        sendTracksToUI();
    }
}


main();
