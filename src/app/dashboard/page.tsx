import { getGenreMovies } from "@/actions/movies";
import Category from "@/components/Category";
import Hero from "@/components/Hero";
import { Genre } from "@/utils/types";

export default async function Home() {
  const genres = await getGenreMovies();

  return (
    <>
      <Hero />
      <section className="flex flex-col gap-8 mt-10 pl-10">
        {genres.map((genre: Genre) => (
          <>
            <Category key={genre.id} title={genre.name} movies={genre.movies} />
          </>
        ))}
      </section>
    </>
  );
}
