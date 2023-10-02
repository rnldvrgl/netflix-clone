// "use client"

// import axios from 'axios';
// import React, { useCallback, useEffect, useMemo, useState } from 'react';
// import { PlusIcon, CheckIcon } from '@heroicons/react/24/outline';

// import getCurrentUser from '@/actions/getCurrentUser';

// interface FavoriteButtonProps {
//     movieId: string
// }

// const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
//     const [toggleFavorite, setToggleFavorite] = useState(false);
//     // const currentUser = getCurrentUser();

//     const handleToggleFavorite = async () => {
//         setToggleFavorite(!toggleFavorite);
//         const val = !toggleFavorite;
//         const favourited = val ? 0 : 1;

//         const data = await runRatingService(favourited);
//     });

//     const runRatingService = async (favourited) => {
//         let response;

//         if (favourited) {
//             response = await axios.delete('/api/favorite', { data: { movieId } });
//         } else {
//             response = await axios.post('/api/favorite', { movieId });
//         }
//     });

//     const Icon = toggleFavorite ? CheckIcon : PlusIcon;

//     useEffect(() => {
//     }, []);
//     return (
//         <div onClick={handleToggleFavorite} className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300">
//             <Icon className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
//         </div>
//     )
// }

// export default FavoriteButton;
