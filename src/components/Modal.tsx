"use client";

import axios from "axios";

import { Genre, Movie, Video } from "@/utils/types";
import { AddCircle, CancelRounded, RemoveCircle } from "@mui/icons-material";

import { useEffect, useState } from "react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Props {
  movie: Movie;
  closeModal: () => void;
}

interface User {
  name: string;
  email: string;
  favorites: number[];
}

const Modal = ({ movie, closeModal }: Props) => {
  const router = useRouter();
  const [video, setVideo] = useState<string>("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const { data: session } = useSession();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_DB_ACCESS_TOKEN}`,
    },
  };

  const getMovieDetails = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_MOVIEDB_URL}/movie/${movie.id}?append_to_response=videos`,
        options
      );
      const data = await res.json();

      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (video: Video) => video.type === "Trailer"
        );

        setVideo(data.videos.results[index].key);
      }
      if (data?.genres) {
        setGenres(data.genres);
      }
    } catch (err) {
      console.log("Error fetching movie details", err);
    }
  };

  useEffect(() => {
    getMovieDetails();
  }, [movie]);

  const getUser = async () => {
    try {
      const response = await axios.get(
        `/api/favorites/${session?.user?.email}`
      );
      setIsFavorite(response.data.find((item: number) => item === movie.id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (session) {
      getUser();
    }
  }, [session]);

  const handleMyList = async () => {
    try {
      await axios.post(`/api/favorites/${session?.user?.email}`, {
        movieId: movie.id,
      });
      setIsFavorite(!isFavorite);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 w-full h-screen z-50">
      <div className="fixed inset-0 z-30 bg-black-1 bg-opacity-95 w-full max-w-2xl mx-auto overflow-hidden overflow-y-scroll scrollbar-hide rounded-xl">
        <button className="absolute right-5 top-5 z-40" onClick={closeModal}>
          <CancelRounded
            sx={{
              color: "white",
              fontSize: "35px",
              ":hover": { color: "red" },
            }}
          />
        </button>
        <iframe
          src={`https://www.youtube.com/embed/${video}?autoplay=1&mute=1&loop=1`}
          loading="lazy"
          allowFullScreen
          className="top-0 left-0 w-full h-3/5"
        />
        <div className="flex flex-col gap-3 p-6 text-white">
          <div className="flex justify-between">
            <div className="flex gap-2">
              <p className="text-base-bold">Name:</p>
              <p className="text-base-light">{movie?.title || movie?.name}</p>
            </div>
            <div className="flex gap-3">
              {isFavorite ? (
                <>
                  <p className="text-base-bold">Remove From List</p>
                  <RemoveCircle
                    className="cursor-pointer text-pink-1"
                    onClick={handleMyList}
                  />
                </>
              ) : (
                <>
                  <p className="text-base-bold">Add To List</p>
                  <AddCircle
                    className="cursor-pointer text-pink-1"
                    onClick={handleMyList}
                  />
                </>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <p className="text-base-bold">Release Date:</p>
            <p className="text-base-light">{movie?.release_date}</p>
          </div>

          <p className="text-base-light">{movie?.overview}</p>

          <div className="flex gap-2">
            <p className="text-base-bold">Rating:</p>
            <p className="text-base-light">{movie?.vote_average}</p>
          </div>

          <div className="flex gap-2">
            <p className="text-base-bold">Genres:</p>
            <p className="text-base-light">
              {genres
                .map((genre: Genre) => genre.name)
                .join(", ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
