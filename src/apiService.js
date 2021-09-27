export default class newApiImg {
  constructor() {
    this.page = 1;
    this.searchQuery = '';
  }
  fetchImg() {
    if (this.searchQuery === ' ' || this.searchQuery === '') {
      console.log('yes');
      return;
    }
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=23531683-f7bec5b5f56f02023e7381294`;
    return fetch(url)
      .then(res => res.json())
      .then(array => {
        console.log(this.page);
        this.page += 1;
        return array.hits;
      });
  }
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(query) {
    this.searchQuery = query;
  }
}
