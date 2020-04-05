const storeItems = (key, items) => {
  localStorage.setItem(key, JSON.stringify(items));
};

class StorageService {
  getItems(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
  }

  addItem(key, value) {
    const oldItems = this.getItems(key);
    const newItems = [...oldItems, value];

    storeItems(key, newItems);
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

    storeItems(key, newItems);
  }
}

export default new StorageService();
