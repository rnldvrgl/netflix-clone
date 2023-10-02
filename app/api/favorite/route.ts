// import { without } from "lodash";
// import prisma from "@/libs/prismadb";
// import { NextRequest, NextResponse } from "next/server";
// import serverAuth from "@/libs/serverAuth";

// export async function POST(req: NextRequest) {
// 	try {
// 		const currentUser = await serverAuth();

// 		if (!currentUser) {
// 			return new NextResponse("Unauthorized", {
// 				status: 401,
// 			});
// 		}

// 		const body = await req.json();

// 		const { movieId } = body;

// 		if (!movieId) {
// 			return new NextResponse("Missing Movie Id", {
// 				status: 400,
// 			});
// 		}

// 		const existingMovie = await prisma.movie.findUnique({
// 			where: {
// 				id: movieId,
// 			},
// 		});

// 		if (existingMovie) {
// 			return new NextResponse("Invalid Movie Id", {
// 				status: 422,
// 			});
// 		}

// 		const user = await prismadb.user.update({
// 			where: {
// 				email: currentUser.email || "",
// 			},
// 			data: {
// 				favoriteIds: {
// 					push: movieId,
// 				},
// 			},
// 		});

// 		return NextResponse.json(user);
// 	} catch (error) {
// 		console.log(error);

// 		return new NextResponse("Something went wrong", {
// 			status: 500,
// 		});
// 	}
// }

// export async function DELETE(request: Request) {
// 	try {
// 		const currentUser = await serverAuth();

// 		if (!currentUser) {
// 			return new NextResponse("Unauthorized", {
// 				status: 401,
// 			});
// 		}

// 		const body = await request.json();

// 		const { movieId } = body;

// 		if (!movieId) {
// 			return new NextResponse("Missing Movie Id", {
// 				status: 400,
// 			});
// 		}

// 		const existingMovie = await prisma.movie.findUnique({
// 			where: {
// 				id: movieId,
// 			},
// 		});

// 		if (existingMovie) {
// 			return new NextResponse("Invalid Movie Id", {
// 				status: 422,
// 			});
// 		}

// 		const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);

// 		const updatedUser = await prisma.user.update({
// 			where: {
// 				email: currentUser.email || "",
// 			},
// 			data: {
// 				favoriteIds: updatedFavoriteIds,
// 			},
// 		});

// 		return NextResponse.json(updatedUser);
// 	} catch (error) {
// 		console.log(error);

// 		return new NextResponse("Something went wrong", {
// 			status: 500,
// 		});
// 	}
// }
