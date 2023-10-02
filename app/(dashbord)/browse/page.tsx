
import getRandomMovies from "@/actions/getRandomMovies";
import Billboard from "@/components/Billboard";

export default async function Home() {
  const randomVideo = await getRandomMovies();
  return (
    <>
      <Billboard randomVideo={randomVideo!} />
      <div className="pb-40">
        {/* <MovieList title="Trending Now" data={movies} /> */}
        {/* <MovieList title="My List" data={favorites} /> */}
      </div>
    </>
  )
}
