export default class StorageService {
  static getItems(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
  }

  static addItem(key, value) {
    const oldItems = JSON.parse(localStorage.getItem(key)) || [];
    const newItems = [...oldItems, value];

    localStorage.setItem(key, JSON.stringify(newItems));
  }
}
