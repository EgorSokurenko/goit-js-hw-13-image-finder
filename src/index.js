import './sass/main.scss';
import newApiImg from './searchImage';

const formInp = document.querySelector('#search-form');
const moreBtn = document.querySelector('#more-btn');

formInp.addEventListener('submit', onSearch);
moreBtn.addEventListener('click', onLoadMore);
const ApiImg = new newApiImg();
function onSearch(e) {
  e.preventDefault();
  let value = e.currentTarget.elements.query.value;
  ApiImg.query = value;
  ApiImg.fetchImg();
}
function onLoadMore() {
  ApiImg.fetchImg();
}
