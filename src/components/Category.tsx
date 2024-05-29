import { Movie } from "@/utils/types";
import React from "react";
import MovieCard from "./MovieCard";

interface Props {
  title: string;
  movies: Movie[];
}

const Category = ({ title, movies }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-heading3-bold text-white">{title}</h1>
      <div className="flex gap-4 overflow-x-scroll scrollbar-hide">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Category;
