import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/libs/prismadb";

import { getSession } from "next-auth/react";
import { without } from "lodash";

export async function POST(req: NextRequest) {
	try {
		const session = await getSession();

		if (!session?.user?.email) {
			throw new Error("Not signed in");
		}

		const body = await req.json();

		const { movieId } = body;

		const existingMovie = await prismadb.movie.findUnique({
			where: {
				id: movieId,
			},
		});

		if (!existingMovie) {
			return new NextResponse("Movie not found", { status: 404 });
		}

		const user = await prismadb.user.findUnique({
			where: {
				email: session.user.email,
			},
		});

		if (!user) {
			return new NextResponse("User not found", { status: 404 });
		}

		const updatedFavoriteIds = without(user.favoriteIds, movieId);

		const updatedUser = await prismadb.user.update({
			where: {
				email: session.user.email,
			},
			data: {
				favoriteIds: updatedFavoriteIds,
			},
		});

		return NextResponse.json(updatedUser);
	} catch (error) {
		console.log(error);
		return new NextResponse("Internal error", { status: 500 });
	}
}
