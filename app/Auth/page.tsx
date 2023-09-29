"use client"

import Input from "@/components/Input/input";
import { useState, useCallback } from "react";
import Image from "next/image";
import Button from "@/components/Buttons/button";
import axios from "axios";
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation";

export default function Auth() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [variant, setVariant] = useState<'login' | 'register'>('login');
    const router = useRouter();

    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login');

        console.log(variant)
    }, [variant])

    const register = useCallback(async () => {
        try {
            await axios.post('/api/auth/register', {
                email,
                name,
                password
            });
        } catch (error) {
            console.log(error)
        }
    }, [email, name, password]);

    const login = useCallback(async () => {
        try {
            await signIn('credentials', {
                email,
                password,
                redirect: false,
                callbackUrl: '/'
            });

            router.push('/');
        } catch (error) {

        }
    }, [email, password, router]);

    return (
        <div className="relative h-full w-full bg-netflix bg-no-repeat bg-center bg-fixed bg-cover">
            <div className="bg-black w-full h-full lg:bg-opacity-50">
                <nav className="px-12 py-5">
                    <Image src="/images/logo.png" width={100} height={30} alt="Netflix Logo" />
                </nav>
                <div className="flex justify-center">
                    <div className="bg-black bg-opacity-70 p-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                        <h2 className="text-white text-4xl mb-8 font-semibold">
                            {variant === 'login' ? 'Sign In' : 'Register'}
                        </h2>
                        <div className="flex flex-col gap-4">
                            {variant === 'register' && (
                                <Input label="Username" id="username" onChange={(e: any) => {
                                    setName(e.target.value);
                                }} value={name} />
                            )}
                            <Input label="Email" id="email" type="email" onChange={(e: any) => {
                                setEmail(e.target.value);
                            }} value={email} />
                            <Input label="Password" id="password" onChange={(e: any) => {
                                setPassword(e.target.value);
                            }} value={password} type="password" />
                            <Button type="button" onClick={() => {
                                { variant === 'login' ? login() : register() }
                            }}>
                                {variant === 'login' ? 'Login' : 'Sign Up'}
                            </Button>
                            <p className="text-neutral-500 mt-12">
                                {variant === 'login' ? 'New to Netflix?' : 'Already have an account?'}
                                <span className="text-white ml-1 hover:underline cursor-pointer" onClick={toggleVariant}>
                                    {variant === 'login' ? 'Create an account.' : 'Login'}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}