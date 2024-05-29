"use client";

import axios from "axios";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { Movie } from "@/utils/types";
import { getApiResponse } from "@/utils/movie-response";
import { fetchMovieDetails } from "@/actions/movies";
import MovieCard from "@/components/MovieCard";

const Favorites = () => {
  const { data: session } = useSession();
  const [myFavoriteMovies, setMyFavoriteMovies] = useState<Movie[]>([]);

  let favoriteMovies: number[];
  const getFavorites = async () => {
    try {
      const data = await axios.get(`/api/favorites/${session?.user?.email}`);
      favoriteMovies = data.data;
      localStorage.setItem("favorites", JSON.stringify(favoriteMovies));

      const myListDetails = await Promise.all(
        favoriteMovies.map(async (movieId: number) => {
          const movieDetails = await fetchMovieDetails(movieId);
          return movieDetails;
        })
      );
      setMyFavoriteMovies(myListDetails);
    } catch (error) {
      console.log("Get favorites error:", error);
    }
  };
  useEffect(() => {
    if (session) {
      getFavorites();
    }
  }, [session]);

  return (
    <div className="flex flex-wrap gap-10 px-20">
      {myFavoriteMovies &&
        myFavoriteMovies.map((movie: Movie) => (
          <div>
            <MovieCard key={movie.id} movie={movie} />
          </div>
        ))}
    </div>
  );
};

export default Favorites;
