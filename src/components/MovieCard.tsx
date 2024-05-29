"use client";

import { baseImageUrl } from "@/utils/constant";

import { Genre, Movie } from "@/utils/types";

import { useState } from "react";
import Modal from "./Modal";

const MovieCard = ({ movie }: { movie: Movie }) => {
  const [showModal, setShowModal] = useState(false);
  const [genres, setGenres] = useState<Genre[]>([]);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  return (
    <>
      <div
        className="flex-shrink-0 mt-20 relative w-80 h-48  cursor-pointer hover:outline-white text-[0.9rem]"
        onClick={openModal}
      >
        <img
          src={
            movie?.backdrop_path || movie?.poster_path
              ? `${baseImageUrl}${movie?.backdrop_path || movie?.poster_path}`
              : "/assets/no-image.png"
          }
          className="object-cover w-full h-full rounded-lg"
          alt={movie?.title || movie?.name}
        />
        <p className="pt-3 text-base-bold">{movie.title || movie.name}</p>
        <div className="flex gap-2">
          <p>Rating:</p>
          <p className="text-base-light">{movie?.vote_average}</p>
        </div>
        <div className="flex gap-2">
          <p>Genres:</p>
          {/* <p className="text-base-light">
            {movie.genres.map((genre: Genre) => genre.name).join(", ")}
          </p> */}
        </div>
        <div className="absolute inset-0 rounded-lg border-4 border-transparent hover:border-white"></div>
      </div>

      {showModal && <Modal movie={movie} closeModal={closeModal} />}
    </>
  );
};

export default MovieCard;
