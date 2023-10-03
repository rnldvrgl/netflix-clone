"use client"

import React from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useRouter, useParams } from 'next/navigation';
import useMovie from '@/hooks/useMovie';

const Watch = () => {
    const router = useRouter();
    const params = useParams();
    const { movieId } = params;

    const { data } = useMovie(movieId as string);

    return (
        <div className="h-screen w-screen bg-black">
            <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
                <ArrowLeftIcon onClick={() => router.push('/')} className="w-4 md:w-10 text-white cursor-pointer hover:opacity-80 transition" />
                <p className="text-white text-1xl md:text-3xl font-bold">
                    {data ? (
                        <span>
                            <span className="font-light">Watching:</span> {data.title}
                        </span>
                    ) : (
                        'Movie Not Found'
                    )}
                </p>
            </nav>
            <div className="h-full w-full flex items-center justify-center">
                {data ? (
                    <video className="h-full w-full" autoPlay controls src={data.videoUrl}></video>
                ) : (
                    <div className="text-white text-lg">Movie not found</div>
                )}
            </div>
        </div>
    );
}


export default Watch;
