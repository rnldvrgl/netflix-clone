import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/lib/serverAuth";

export default async function GET(
	request: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const { currentUser } = await serverAuth(request);
	} catch (error) {
		console.log(error);
		res.status(400).end();
	}
}
