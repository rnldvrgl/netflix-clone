import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

export default async function handler(
	request: NextApiRequest,
	response: NextApiResponse
) {
	if (request.method !== "POST") {
		return response.status(405).json({ message: "Method not allowed" });
	}

	try {
		const { email, name, password } = request.body;

		if (!email || !name || !password) {
			return response
				.status(400)
				.json({ message: "Missing credentials" });
		}

		const existingUser = await prismadb.user.findUnique({
			where: {
				email,
			},
		});

		if (existingUser) {
			return response.status(422).json({ message: "Email taken!" });
		}

		const hashedPassword = await bcrypt.hash(password, 12);

		const user = await prismadb.user.create({
			data: {
				email,
				name,
				hashedPassword,
				emailVerified: new Date(),
			},
		});

		return response.status(201).json({ message: "User created!" });
	} catch (error) {
		console.log(error);

		return response.status(500).json({ message: "Internal server error" });
	}
}
