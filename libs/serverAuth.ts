import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import prisma from "@/libs/prismadb";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const serverAuth = async () => {
	const session = await getServerSession(authOptions);

	if (!session?.user?.email) {
		throw new Error("Not signed in");
	}

	const currentUser = await prisma.user.findUnique({
		where: {
			email: session.user.email as string,
		},
	});

	if (!currentUser) {
		throw new Error("Not signed in");
	}

	return { currentUser };
};

export default serverAuth;
