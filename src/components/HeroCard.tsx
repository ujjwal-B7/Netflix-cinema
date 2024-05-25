"use client";

import { Movie } from "@/utils/types";

import { baseImageUrl } from "@/utils/constant";
import { useState } from "react";
import Modal from "./Modal";

const HeroCard = ({
  filteredTrendingMovie,
}: {
  filteredTrendingMovie: Movie;
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <div className="flex flex-col px-20 pt-20 gap-10 max-w-xl z-5 ">
        <div className="absolute top-0 left-0 -z-10 h-screen w-screen">
          <img
            className="object-cover h-full w-full"
            src={`${baseImageUrl}${filteredTrendingMovie.poster_path}`}
            alt="trending_filteredTrendingMovie"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black-1"></div>
        </div>
        <h1 className="text-heading1-bold  text-white">
          {filteredTrendingMovie.title}
        </h1>
        <p className="text-base-medium text-white">
          {filteredTrendingMovie.overview}
        </p>
        <div className="flex gap-8">
          <button
            className="flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl cursor-pointer bg-white text-body-bold hover:bg-pink-1 text-pink-1 hover:text-white"
            onClick={() => setShowModal(!showModal)}
          >
            {/* <PlayCircleOutlineOutlined /> */}
            Play Now
          </button>
          <button
            className="flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl cursor-pointer bg-white text-body-bold hover:bg-pink-1 text-pink-1 hover:text-white"
            onClick={() => setShowModal(!showModal)}
          >
            {/* <InfoOutlined /> */}
            More Info
          </button>
        </div>
      </div>
      {showModal && <Modal filteredTrendingMovie={filteredTrendingMovie} />}
    </>
  );
};

export default HeroCard;
