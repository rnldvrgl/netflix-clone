import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

export async function GET(req: NextRequest) {
	try {
		await serverAuth();

		const moviesCount = await prisma.movie.count();
		const randomIndex = Math.floor(Math.random() * moviesCount);

		const randomMovies = await prisma.movie.findMany({
			take: 1,
			skip: randomIndex,
		});

		return NextResponse.json(randomMovies[0]);
	} catch (error) {
		console.log(error);
		return new NextResponse("Internal error", { status: 500 });
	}
}
