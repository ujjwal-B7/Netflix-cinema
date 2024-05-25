import { getApiResponse } from "@/utils/movie-response";

export const getTrendingMovies = async () => {
  const data = await getApiResponse("/trending/movie/week");
  const trending = data.results;
  return trending;
};

export const getGenreMovies = async () => {
  //   const fetchedMovies = await getApiResponse("/genre/movie/list");
  //   const genres = fetchedMovies.genres;
  //   for (let genre of genres) {
  //     const data = await getApiResponse(
  //       `/discover/movie?with_genres=${genre.id}`
  //     );
  //     genre.movies = data.results;
  //   }
  //   return genres;
};
