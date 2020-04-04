import axios from "axios";

const client = axios.create({ baseURL: "http://openlibrary.org" });

export default class ApiService {
  static search(term, page) {
    return client
      .get(`/search.json?q=${term}&page=${page || 1}`)
      .then((res) => res.data);
  }
}
