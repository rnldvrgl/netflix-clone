"use client"

import Input from "@/components/Input/input";
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Button from "@/components/Buttons/button";
import axios from "axios";
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import AuthSocialButton from "@/components/Buttons/AuthSocialButton";

type Variant = 'login' | 'register';

export default function Auth() {
    const session = useSession();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [variant, setVariant] = useState<Variant>('login');

    useEffect(() => {
        if (session?.status === 'authenticated') {
            router.push('/browse')
        }
    }, [session?.status, router]);

    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login');
    }, [])

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
                    toast.error(callback.error);
                }

                if (callback?.ok && !callback?.error) {
                    router.push('/browse');
                }
            }).catch((error) => {
                toast.error(error.message);
            }).finally(() => setIsLoading(false));
        }

        if (variant === 'login') {
            signIn('credentials', {
                ...data,
                redirect: false
            }).then((callback) => {
                if (callback?.error) {
                    toast.error(callback.error);
                }

                if (callback?.ok && !callback?.error) {
                    toast.success("logged in");
                    router.push('/browse');
                }
            }).finally(() => setIsLoading(false));
        }
    }

    const socialAction = (action: string) => {
        setIsLoading(true);

        signIn(action, { redirect: false })
            .then((callback) => {
                if (callback?.error) {
                    toast.error(callback.error);
                }

                if (callback?.ok && !callback?.error) {
                    toast.success("logged in");
                    router.push('/browse')
                }
            })
            .finally(() => setIsLoading(false));
    }

    return (
        <div className="relative flex justify-center items-center h-full w-full bg-netflix bg-no-repeat bg-center bg-fixed bg-cover">
            <div className="bg-black w-full h-full lg:bg-opacity-50 flex items-center justify-center">
                <nav className="absolute top-0 left-0 px-12 py-5 hidden lg:block">
                    <Image src="/images/logo.png" width={100} height={30} alt="Netflix Logo" />
                </nav>
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
                                id="name"
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
                        <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                            <AuthSocialButton
                                icon={FcGoogle}
                                onClick={() => socialAction('google')}
                            />
                            <AuthSocialButton
                                icon={FaGithub}
                                onClick={() => socialAction('github')}
                            />
                        </div>
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
    );
}