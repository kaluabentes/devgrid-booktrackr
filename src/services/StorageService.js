class StorageService {
  getItems(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
  }

  storeItems(key, items) {
    localStorage.setItem(key, JSON.stringify(items));
  }

  addItem(key, value) {
    const oldItems = this.getItems(key);
    const newItems = [...oldItems, value];

    this.storeItems(key, newItems);
  }

  editItem(key, id, value) {
    const oldItems = this.getItems(key);

    const newItems = oldItems.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          ...value,
        };
      }

      return item;
    });

    this.storeItems(key, newItems);
  }
}

export default new StorageService();
