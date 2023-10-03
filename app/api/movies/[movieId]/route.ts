import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

interface IParams {
	movieId?: string;
}

export async function GET(req: NextRequest, { params }: { params: IParams }) {
	try {
		// await serverAuth();

		const { movieId } = params;
		// const movieId = req.nextUrl.searchParams.get("movieId");
		// const movieId = "651a23704b286c5b09369dfa";

		if (typeof movieId !== "string") {
			throw new Error("Invalid Id");
		}

		if (!movieId) {
			throw new Error("Missing Id");
		}

		const movie = await prisma.movie.findUnique({
			where: {
				id: movieId,
			},
		});

		return NextResponse.json(movie);
	} catch (error) {
		console.log(error);
		return new NextResponse("Internal error", { status: 500 });
	}
}
