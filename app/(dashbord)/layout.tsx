import getCurrentUser from "@/actions/getCurrentUser";
import Navbar from "@/components/Navbar";


export default async function UsersLayout({
    children
}: {
    children: React.ReactNode,
}) {
    const currentUser = await getCurrentUser();
    return (
        //// @ts-expect-error Server Component
        <>
            <Navbar currentUser={currentUser!} />
            {children}
        </>
    );
}