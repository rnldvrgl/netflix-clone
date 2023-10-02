import prisma from "@/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const getMovie = async (movieId: string) => {
	try {
		const currentUser = await getCurrentUser();

		if (!currentUser?.email) {
			return null;
		}

		const movie = await prisma.movie.findUnique({
			where: {
				id: movieId,
			},
		});

		return movie;
	} catch (error: any) {
		return null;
	}
};

export default getMovie;
