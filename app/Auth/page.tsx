"use client"

import Input from "@/components/Input/input";
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Button from "@/components/Buttons/button";
import axios from "axios";
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

type Variant = 'login' | 'register';

export default function Auth() {
    const session = useSession();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [variant, setVariant] = useState<Variant>('login');

    // useEffect(() => {
    //     if (session?.status === 'authenticated') {
    //         router.push('/')
    //     }
    // }, [session?.status, router]);


    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login');

        console.log(variant)
    }, [variant])


    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        if (variant === 'register') {
            axios.post('/api/auth/register', data).then(() => signIn('credentials', {
                ...data,
                redirect: false
            })).then((callback) => {
                if (callback?.error) {
                    console.log(callback.error)
                    // toast.error(callback.error);
                }

                if (!callback?.error) {
                    router.push('/');
                }
            }).catch((error) => {
                // toast.error(error.message);
            }).finally(() => setIsLoading(false));
            console.log(data)
        }

        if (variant === 'login') {
            signIn('credentials', {
                ...data,
                redirect: false
            }).then((callback) => {
                if (callback?.error) {
                    console.log(callback.error)
                    // toast.error(callback.error);
                }

                if (!callback?.error) {
                    router.push('/');
                }
            }).finally(() => setIsLoading(false));
        }

    }

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
                        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} >
                            {variant === 'register' && (
                                <Input
                                    disabled={isLoading}
                                    register={register}
                                    errors={errors}
                                    required
                                    id="username"
                                    label="Username"
                                />
                            )}
                            <Input
                                disabled={isLoading}
                                register={register}
                                errors={errors}
                                required
                                id="email"
                                label="Email address"
                                type="email"
                            />
                            <Input
                                disabled={isLoading}
                                register={register}
                                errors={errors}
                                required
                                id="password"
                                label="Password"
                                type="password"
                            />
                            <Button type="submit" disabled={isLoading}>
                                {variant === 'login' ? 'Login' : 'Sign Up'}
                            </Button>
                            <p className="text-neutral-500 mt-12">
                                {variant === 'login' ? 'New to Netflix?' : 'Already have an account?'}
                                <span className="text-white ml-1 hover:underline cursor-pointer" onClick={toggleVariant}>
                                    {variant === 'login' ? 'Create an account.' : 'Login'}
                                </span>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}