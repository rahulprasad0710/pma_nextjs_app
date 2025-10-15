"use client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

interface LoginFormInputs {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export default function RegisterFormComponent() {
    const form = useForm<LoginFormInputs>();

    const onSubmit = async (payload: LoginFormInputs) => {
        try {
            const { data, error } = await authClient.signUp.email({
                name: payload.username,
                email: payload.email,
                password: payload.password,
            });
        } catch (err: unknown) {
            toast.error("Login failed. Try again.");
        }
    };

    const handleGoogleSignIn = () => {
        toast.error("Start Google sign-in flow");
    };

    return (
        <div className='min-h-screen bg-gray-50 flex md:items-center justify-center px-4 py-12'>
            <div className='max-w-md w-full bg-white rounded-s-sm shadow-md p-8'>
                <div className='flex items-center gap-3 mb-6'>
                    <div className='w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold'>
                        LP
                    </div>
                    <div>
                        <h1 className='text-2xl font-semibold text-gray-900'>
                            Welcome
                        </h1>
                        <p className='text-sm text-gray-500'>
                            Sign in to your account to continue
                        </p>
                    </div>
                </div>

                <Form {...form}>
                    <form
                        className='space-y-4'
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FormField
                            control={form.control}
                            name='username'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='John Doe'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='you@company.com'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type='password'
                                            placeholder='Enter your password'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='confirmPassword'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type='password'
                                            placeholder='Confirm password'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type='submit'
                            className='w-full py-6!'
                            disabled={form.formState.isSubmitting}
                        >
                            {form.formState.isSubmitting
                                ? "Signing in..."
                                : "Sign Up"}
                        </Button>
                    </form>
                </Form>

                <div className='mt-6 text-center'>
                    <p className='text-sm text-gray-500'>Or continue with</p>
                    <Button
                        variant='outline'
                        className='mt-2 w-full'
                        onClick={handleGoogleSignIn}
                    >
                        Sign in with Google
                    </Button>
                </div>
                <div className='mt-6 text-center flex items-center gap-2'>
                    <p className='text-sm text-gray-500'>
                        Do not have an account?
                    </p>
                    <Link
                        href='/auth/register'
                        className='text-sm text-primary underline'
                    >
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
}
