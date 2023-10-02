
import getFavorites from "@/actions/getFavorites";
import getMovies from "@/actions/getMovies";
import getRandomMovies from "@/actions/getRandomMovies";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import getCurrentUser from "@/actions/getCurrentUser";

import Navbar from "@/components/Navbar";

export default async function Home() {
  const currentUser = await getCurrentUser();
  const randomVideo = await getRandomMovies();
  const movies = await getMovies();
  const favorites = await getFavorites();
  return (
    <>
      <Navbar currentUser={currentUser!} />
      <Billboard randomVideo={randomVideo!} />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies!} />
        <MovieList title="My List" data={favorites!} />
      </div>
    </>
  )
}
