import axios from "axios";

export default class NewApiService {
    constructor() {
        this.searchQwery = "";
        this.page = 1;
    }

    fetchPic = async () => {
    const BASE_URL = "https://pixabay.com/api/";
    const API_KEY = "25864634-63797060ecbe0caa7b3998a71";
    const searchParameters = "image_type=photo&orientation=horizontal&safesearch=true&per_page=40";
    try {
        const response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${this.searchQwery}&${searchParameters}&page=${this.page}`);
        const images = response.data;
        this.incrementPage();        
         return images;
        } catch (error) { console.log(error) };
    }
    
    incrementPage() {
        this.page+=1
    }

    resetPage() {
        this.page=1
    }

    get query() {
        return this.searchQwery;
    }

    set query(newQwery) {
        this.searchQwery = newQwery; 
    }
}


  