import prisma from "@/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const getMovies = async () => {
	try {
		const currentUser = await getCurrentUser();

		if (!currentUser) {
			return null;
		}

		const movies = await prisma.movie.findMany();

		if (!movies) {
			return null;
		}

		return movies;
	} catch (error: any) {
		return null;
	}
};

export default getMovies;
