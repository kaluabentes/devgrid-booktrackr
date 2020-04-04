const PLACEHOLDER =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSqPB7HMDJjWT2u24S_3RLfMriDu2zGGBtr1idPSc_BwhXiCMyI&usqp=CAU";

export default function getCover(id) {
  if (!id || id === -1) {
    return PLACEHOLDER;
  }

  return `http://covers.openlibrary.org/b/id/${id}-L.jpg`;
}
