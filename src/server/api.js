class API {
    /** API-ключ */
    apiKey = "edf462b7f6b5ebf41647281e15134d48";



    /**
     * Функция отправки запроса по ссылке 
     * @param {string} link - Ссылка на API-метод
     * @returns {any} Данные с сервера 
     */
    async fetchElement(link) {
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
    getTopArtists() {
        return this.fetchElement(
            "https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=" + this.apiKey + "&format=json&limit=12");
    }



    /**
     * Функция получения тегов исполнителя по его имени
     * @param {string} artist - Имя исполнителя
     * @returns {any} Данные с сервера 
     */
    async getArtistTags(artist){
        const data = await this.fetchElement(
            "https://ws.audioscrobbler.com/2.0/?method=artist.gettoptags&artist=" + encodeURIComponent(artist) + "&api_key=" + this.apiKey + "&format=json");
        return data.toptags.tag.slice(0,3);
    }



    /**
     * Функция получения чарта треков
     * @returns {any} Данные с сервера 
     */
    async getTopTracks() {
        return this.fetchElement(
            "https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=" + this.apiKey + "&format=json&limit=15");
    }



    /**
     * Функция получения тегов трека по его названию и имени исполнителя
     * @param {string} artist - Имя исполнителя
     * @param {string} track - Название трека
     * @returns {any} Данные с сервера 
     */
    async getTrackTags(artist, track){
        const data = await this.fetchElement("https://ws.audioscrobbler.com/2.0/?method=track.gettoptags&artist=" + encodeURIComponent(artist) + "&track=" + encodeURIComponent(track) + "&api_key=" + this.apiKey + "&format=json");
        return data.toptags.tag.slice(0,3);
    }



    /**
     * Функция поиска исполнителей по их имени
     * @param {string} artist - Имя исполнителя
     * @returns {any} Данные с сервера 
     */
    getSearchArtists(artist) {
        return this.fetchElement("https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=" + artist + "&api_key=" + this.apiKey + "&format=json&limit=8");
    }



    /**
     * Функция поиска альбомов по их названию
     * @param {string} album - название альбома
     * @returns {any} Данные с сервера 
     */
    getSearchAlbums(album) {
        return this.fetchElement("http://ws.audioscrobbler.com/2.0/?method=album.search&album=" + album + "&api_key=" + this.apiKey + "&format=json&limit=8");
    }



    /**
     * Функция поиска треков по их названию
     * @param {string} track - Название трека
     * @returns {any} Данные с сервера 
     */
    getSearchTracks(track) {
        return this.fetchElement("http://ws.audioscrobbler.com/2.0/?method=track.search&track=" + track + "&api_key=" + this.apiKey + "&format=json&limit=10");
    }
}

export default new API();