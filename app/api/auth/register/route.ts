import bcrypt from "bcrypt";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { email, name, password } = body;

		if (!email || !name || !password) {
			return new NextResponse("Missing credentials", {
				status: 400,
			});
		}

		const existingUser = await prismadb.user.findUnique({
			where: {
				email,
			},
		});

		if (existingUser) {
			return new NextResponse("Email already exists", {
				status: 422,
			});
		}

		const hashedPassword = await bcrypt.hash(password, 12);

		const user = await prismadb.user.create({
			data: {
				email,
				name,
				image: "",
				hashedPassword,
				emailVerified: new Date(),
			},
		});

		return NextResponse.json(user);
	} catch (error) {
		console.log(error);

		return new NextResponse("Something went wrong", {
			status: 500,
		});
	}
}
