import 'simplelightbox/dist/simple-lightbox.min.css';
import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import NewApiService from './js/apiPag';


const lightbox = new SimpleLightbox('.gallery a');
const loadMoreButton = document.querySelector(".load-more");
const newApiService = new NewApiService;
////////////////////// References \\\\\\\\\\\\\\\\\\\\\\\\\\\\\
const queryFormRef = document.querySelector(".query-form");
const galleryRef = document.querySelector(".gallery");
const CardsRef = galleryRef.getElementsByTagName("a");



const onImagesQuery = (event) => {
    event.preventDefault();
    galleryRef.innerHTML = "";
    newApiService.query = event.currentTarget.queryInput.value;
    newApiService.resetPage();
    newApiService.fetchPic().then((images) => {
    if (newApiService.query === "") { loadMoreButton.classList.add("is-hidden"); return };    
    if (images.hits.length === 0) {
      loadMoreButton.classList.add("is-hidden");
      return Notiflix.Notify.info("Sorry, there are no images matching your search query. Please try again.");
    }
    generatePicMarkup(images.hits);
    Notiflix.Notify.success(`Hooray! We found ${images.totalHits} images.`);
        loadMoreButton.classList.remove("is-hidden");   
      lightbox.refresh()      
    })
};

const imageMarkup = (images) => {
    const markup = images.map(({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) => { 
        return `<a href="${largeImageURL}">
         <div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" width=100% />
  <div class="info">
    <p class="info-item">
      <span class="info-item__bold">Likes</span>: ${likes}
    </p>
    <p class="info-item">
      <span class="info-item__bold">Views</span>: ${views}
    </p>
    <p class="info-item">
      <span class="info-item__bold">Comments</span>: ${comments}
    </p>
    <p class="info-item">
      <span class="info-item__bold">Downloads</span>: ${downloads}
    </p>
  </div>
</div>
</a>`
    }).join("");
    return markup
};

const generatePicMarkup = (images) => {
    galleryRef.insertAdjacentHTML("beforeend", imageMarkup(images))
};
const onMoreCards = () => {
    loadMoreButton.classList.add("is-hidden");
    newApiService.fetchPic().then(images => {
      generatePicMarkup(images.hits);         
      lightbox.refresh();
      if (images.totalHits !== CardsRef.length) {
        loadMoreButton.classList.remove("is-hidden");
      } else {Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");}
    });
    
}

queryFormRef.addEventListener("submit", onImagesQuery);
loadMoreButton.addEventListener("click", onMoreCards);



