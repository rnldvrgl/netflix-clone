import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

export async function GET() {
	try {
		await serverAuth();

		const movies = await prisma.movie.findMany();

		return NextResponse.json(movies);
	} catch (error) {
		console.log({ error });
		return new NextResponse("Internal error", { status: 500 });
	}
}
