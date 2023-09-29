"use client"

import Input from "@/components/Input/input";
import { useState, useCallback } from "react";
import Image from "next/image";
import Button from "@/components/Buttons/button";

export default function Auth() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [variant, setVariant] = useState<'login' | 'register'>('login');

    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login');

        console.log(variant)
    }, [variant])

    return (
        <div className="relative h-full w-full bg-netflix bg-no-repeat bg-center bg-fixed bg-cover">
            <div className="bg-black w-full h-full lg:bg-opacity-50">
                <nav className="px-12 py-5">
                    <Image src="/images/logo.png" width={100} height={30} alt="Netflix Logo" />
                </nav>
                <div className="flex justify-center">
                    <div className="bg-black bg-opacity-70 p-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                        <h2 className="text-white text-4xl mb-8 font-semibold">Sign In</h2>
                        {variant === 'login' ? (
                            <div className="flex flex-col gap-4">
                                <Input label="Username" id="username" onChange={(e: any) => {
                                    setName(e.target.value);
                                }} value={name} />
                                <Input label="Email" id="email" type="email" onChange={(e: any) => {
                                    setEmail(e.target.value);
                                }} value={email} />
                                <Input label="Password" id="password" onChange={(e: any) => {
                                    setPassword(e.target.value);
                                }} value={password} type="password" />
                                <Button type="button">
                                    Login
                                </Button>
                                <p className="text-neutral-500 mt-12">
                                    First time using Netflix?
                                    <span className="text-white ml-1 hover:underline cursor-pointer" onClick={toggleVariant}>
                                        Create an account.
                                    </span>
                                </p>
                            </div>
                        ) : (
                            <div></div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}