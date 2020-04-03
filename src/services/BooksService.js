import axios from "axios";

export default class BooksService {
  static search(term) {
    return axios
      .get(`http://openlibrary.org/search.json?q=${term}`)
      .then(res => res.data);
  }
}
