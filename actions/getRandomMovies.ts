import prisma from "@/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const getRandomMovies = async () => {
	try {
		await getCurrentUser();

		const movieCount = await prisma.movie.count();
		const randomIndex = Math.floor(Math.random() * movieCount);
		const randomMovies = await prisma.movie.findMany({
			take: 1,
			skip: randomIndex,
		});

		// Check if any movies were found
		if (randomMovies && randomMovies.length > 0) {
			return randomMovies[0]; // Return the first movie
		} else {
			// Handle the case where no movies were found
			return null;
		}
	} catch (error) {
		console.log(error);
		throw error; // Rethrow the error to handle it elsewhere if needed
	}
};

export default getRandomMovies;
