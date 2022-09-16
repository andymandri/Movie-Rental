export const genres = [
  { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
  { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
  { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
  { _id: "5b21ca3eeb7f6fbccd471821", name: "Horror" },
  { _id: "5b21ca3eeb7f6fbccd471822", name: "Animation" },
  { _id: "5b21ca3eeb7f6fbccd471823", name: "Friction" },
];

export function getGenres() {
  return genres.filter((g) => g);
}

export function getGenre(id) {
  return genres.find((g) => g._id === id);
}
