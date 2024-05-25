
import { getGenreMovies, getTrendingMovies } from "@/actions/movies";
import HeroCard from "./HeroCard";

// import { InfoOutlined, PlayCircleOutlineOutlined } from "@mui/icons-material";




const Hero = async () => {

  const trendingMovies = await getTrendingMovies();
  const randomNumber = Math.floor(Math.random() * trendingMovies.length);
  const filteredTrendingMovie = trendingMovies[randomNumber];

  return (
   <div>
<HeroCard filteredTrendingMovie={filteredTrendingMovie}/>
   </div>
  );
};

export default Hero;
