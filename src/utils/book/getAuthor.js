export default function getAuthor(author) {
  return Array.isArray(author) ? author.join(", ") : "";
}
