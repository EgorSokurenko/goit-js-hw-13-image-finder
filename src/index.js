import './sass/main.scss';
import newApiImg from './apiService';
import blockImg from './partials/block.hbs';

const formInp = document.querySelector('#search-form');
const moreBtn = document.querySelector('#more-btn');
const listImg = document.querySelector('.gallery')

formInp.addEventListener('submit', onSearch);
moreBtn.addEventListener('click', onLoadMore);
const ApiImg = new newApiImg();
function onSearch(e) {
  e.preventDefault();
  clearMarkup()
  let value = e.currentTarget.elements.query.value;
  ApiImg.query = value;
  ApiImg.resetPage()
  ApiImg.fetchImg().then(images=>appendImagesMarkup(images))
}
function onLoadMore() {
  ApiImg.fetchImg().then(images=>appendImagesMarkup(images))

  
 
}
function appendImagesMarkup(images){

  listImg.insertAdjacentHTML('beforeend',blockImg(images))
  setTimeout(scrollBtn, 1000);
}
function clearMarkup(){
  listImg.innerHTML = ''
}
function scrollBtn(){
  moreBtn.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}
