"use client";

import { baseImageUrl } from "@/utils/constant";

import { Genre, Movie } from "@/utils/types";

import { useState } from "react";
import Modal from "./Modal";

const MovieCard = ({
  filteredTrendingMovie,
}: {
  filteredTrendingMovie: Movie;
}) => {
  const [showModal, setShowModal] = useState(false);
  const [genres, setGenres] = useState<Genre[]>([]);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  console.log(filteredTrendingMovie.genres);
  return (
    <>
      <div
        className="relative w-80 h-48  cursor-pointer hover:outline-white text-[0.9rem]"
        onClick={openModal}
      >
        <img
          src={
            filteredTrendingMovie?.backdrop_path ||
            filteredTrendingMovie?.poster_path
              ? `${baseImageUrl}${
                  filteredTrendingMovie?.backdrop_path ||
                  filteredTrendingMovie?.poster_path
                }`
              : "/assets/no-image.png"
          }
          className="object-cover w-full h-full rounded-lg"
          alt={filteredTrendingMovie?.title || filteredTrendingMovie?.name}
        />
        <p className="pt-3 text-base-bold">
          {filteredTrendingMovie.title || filteredTrendingMovie.name}
        </p>
        <div className="flex gap-2">
          <p>Rating:</p>
          <p className="text-base-light">
            {filteredTrendingMovie?.vote_average}
          </p>
        </div>
        <div className="flex gap-2">
          <p>Genres:</p>
          <p className="text-base-light">
            {filteredTrendingMovie.genres
              .map((genre: Genre) => genre.name)
              .join(", ")}
          </p>
        </div>
        <div className="absolute inset-0 rounded-lg border-4 border-transparent hover:border-white"></div>
      </div>

      {showModal && (
        <Modal
          filteredTrendingMovie={filteredTrendingMovie}
          closeModal={closeModal}
        />
      )}
    </>
  );
};

export default MovieCard;
