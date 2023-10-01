import { PrismaClient } from "@prisma/client";

const prisma = global.prismadb || new PrismaClient();

if (process.env.NODE_ENV === "development") global.prismadb = prisma;

export default prisma;
