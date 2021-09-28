import { alert, error, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
defaultModules.set(PNotifyMobile, {});
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
      console.log(images);
      if(images.length===0){
        loadMoreBtn.hide()
        error({ text: 'По запросу ничего не найдено', })
      }else if(images.length>=12){
        loadMoreBtn.unable();
      }else{
        loadMoreBtn.hide()
      }
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
  scrollBtn()
}
function clearMarkup() {
  listImg.innerHTML = '';
}
function scrollBtn() {
  listImg.scrollIntoView({
    behavior: 'smooth',
    block: 'end'
  });
}
