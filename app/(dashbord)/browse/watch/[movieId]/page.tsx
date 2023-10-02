
import React from 'react';
import getMovie from '@/actions/getMovieById';
import ReturnButton from '@/components/Buttons/ReturnButton';

interface IParams {
    movieId: string;
}

const Watch = async ({ params }: { params: IParams }) => {
    const movieData = await getMovie(params.movieId);

    return (
        <div className="h-screen w-screen bg-black">
            <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
                <ReturnButton />
                <p className="text-white text-1xl md:text-3xl font-bold">
                    {movieData ? (
                        <span>
                            <span className="font-light">Watching:</span> {movieData.title}
                        </span>
                    ) : (
                        'Movie Not Found'
                    )}
                </p>
            </nav>
            <div className="h-full w-full flex items-center justify-center">
                {movieData ? (
                    <video className="h-full w-full" autoPlay controls src={movieData.videoUrl}></video>
                ) : (
                    <div className="text-white text-lg">Movie not found</div>
                )}
            </div>
        </div>
    );
}


export default Watch;
