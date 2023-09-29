import Input from "@/components/Input/input";
import Image from "next/image";

export default function Auth() {
    return (
        <div className="relative h-full w-full bg-netflix bg-no-repeat bg-center bg-fixed bg-cover">
            <div className="bg-black w-full h-full lg:bg-opacity-50">
                <nav className="px-12 py-5">
                    <Image src="/images/logo.png" width={100} height={30} alt="Netflix Logo" />
                </nav>
                <div className="flex justify-center">
                    <div className="bg-black bg-opacity-70 p-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                        <h2 className="text-white text-4xl mb-8 font-semibold">Sign In</h2>
                        <div className="flex flex-col gap-4">
                            <Input />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}