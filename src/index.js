import './sass/main.scss';
import NewApiImg from './apiService';
import LoadMoreBtn from './load-more-btn';
import blockImg from './partials/block.hbs';

const loadMoreBtn = new LoadMoreBtn({
  selector: '#more-btn',
  hidden: true,
});
const formInp = document.querySelector('#search-form');
const moreBtn = document.querySelector('#more-btn');
const listImg = document.querySelector('.gallery');
const apiImg = new NewApiImg();

formInp.addEventListener('submit', onSearch);
moreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  loadMoreBtn.show();
  loadMoreBtn.disabled();
  e.preventDefault();
  clearMarkup();
  let value = e.currentTarget.elements.query.value;
  apiImg.query = value;
  apiImg.resetPage();
  apiImg
    .fetchImg()
    .then(images => {
      loadMoreBtn.unable();
      appendImagesMarkup(images);
    })
    .catch(error => console.log);
}
function onLoadMore() {
  loadMoreBtn.disabled();
  apiImg
    .fetchImg()
    .then(images => {
      loadMoreBtn.unable();
      appendImagesMarkup(images);
    })
    .catch(error => console.log);
}
function appendImagesMarkup(images) {
  listImg.insertAdjacentHTML('beforeend', blockImg(images));
  setTimeout(scrollBtn, 1000);
}
function clearMarkup() {
  listImg.innerHTML = '';
}
function scrollBtn() {
  listImg.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}
