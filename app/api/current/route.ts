import { NextResponse } from "next/server";
import serverAuth from "@/libs/serverAuth";

export async function GET() {
	try {
		const { currentUser } = await serverAuth();

		return NextResponse.json(currentUser);
	} catch (error) {
		console.log(error);
		return new NextResponse("Internal error", { status: 500 });
	}
}
