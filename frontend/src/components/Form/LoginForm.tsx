import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { UserLoginData } from '../../types/user';
import { createUser } from '../../api/auth';

const LoginForm: React.FC = () => {
    const [userData, setUserData] = useState<UserLoginData>({ email: '', password: '' });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<UserLoginData>({
        defaultValues: userData
    });

    const onSubmit = async (data: UserLoginData) => {
        console.log(data);

        // const result = await createUser(data)
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md bg-white rounded-lg p-6 ">
                <h2 className="text-2xl font-bold mb-6 text-center text-zinc-950">Login</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: 'Invalid email address'
                                }
                            })}
                            type="text"
                            name="email"
                            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="Enter your email"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <input
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters'
                                }
                            })}
                            type="password"
                            name="password"
                            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.password ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="Enter your password"
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-zinc-950 text-white py-3 rounded-md hover:bg-zinc-900 transition duration-300"
                    >
                        Login
                    </button>

                    <div className="flex justify-center font-semibold mt-4">
                        <button className="text-sm">
                            <Link to="/signup">
                                Don't have an account? Sign Up
                            </Link>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;