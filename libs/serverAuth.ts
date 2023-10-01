import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/libs/prismadb";
import getSession from "@/actions/getSession";

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await getSession();

	if (!session?.user?.email) {
		throw new Error("Not signed in");
	}

	const currentUser = await prismadb.user.findUnique({
		where: {
			email: session.user.email,
		},
	});

	if (!currentUser) {
		throw new Error("Not signed in");
	}

	return { currentUser };
};

export default serverAuth;
