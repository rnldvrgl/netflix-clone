import prisma from "@/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const getFavorites = async () => {
	try {
		const currentUser = await getCurrentUser();

		if (!currentUser) {
			return null;
		}

		const favoritedMovies = await prismadb.movie.findMany({
			where: {
				id: {
					in: currentUser?.favoriteIds,
				},
			},
		});

		if (!favoritedMovies) {
			return null;
		}

		return favoritedMovies;
	} catch (error: any) {
		return null;
	}
};

export default getFavorites;
