
"use client"


import useMovieList from '@/hooks/useMovieList';
// import useFavorites from '@/hooks/useFavorites';
// import useInfoModalStore from '@/hooks/useInfoModalStore';
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";

export default function Home() {
  const { data: movies = [] } = useMovieList();
  // const { data: favorites = [] } = useFavorites();
  // const { isOpen, closeModal } = useInfoModalStore();

  return (
    <>
      {/* <InfoModal visible={isOpen} onClose={closeModal} /> */}
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies} />
        {/* <MovieList title="My List" data={favorites} /> */}
      </div>
    </>
  )
}
