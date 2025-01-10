import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { UserSignupData } from '../../types/user';
import { createUser } from '../../api/auth';
import toast from 'react-hot-toast';

const SignupForm: React.FC = () => {

    const [loading, setLoading] = useState(false)
    const navigator = useNavigate()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<UserSignupData>();

    const password = watch("password");

    const onSubmit = async (data: UserSignupData) => {
        console.log(data);
        setLoading(!loading)
        const result = await createUser(data)

        if (result?.success) {
            toast.success("Register successfull")
            navigator('/home')
        } else {
            toast.error("Register failed")
        }
        setLoading(!loading)
    };

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="w-full max-w-md bg-white rounded-lg p-6 h-auto">
                <h2 className="text-2xl font-bold mb-4 text-center text-zinc-950">Sign Up</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                            {...register("name", {
                                required: "Name is required",
                                minLength: {
                                    value: 2,
                                    message: "Name must be at least 2 characters"
                                }
                            })}
                            type="text"
                            className={`w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.name ? 'border-red-500' : ''}`}
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <input
                            {...register("address", {
                                required: "Address is required",
                                minLength: {
                                    value: 10,
                                    message: "Please enter a complete address"
                                }
                            })}
                            type="text"
                            className={`w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.address ? 'border-red-500' : ''}`}
                        />
                        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                        <select
                            {...register("gender", {
                                required: "Please select a gender"
                            })}
                            className={`w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.gender ? 'border-red-500' : ''}`}
                        >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input
                            {...register("username", {
                                required: "Username is required",
                                minLength: {
                                    value: 4,
                                    message: "Username must be at least 4 characters"
                                }
                            })}
                            type="text"
                            className={`w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.username ? 'border-red-500' : ''}`}
                        />
                        {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters"
                                },
                                pattern: {
                                    value: /^(?=.*[A-Z])(?=.*[0-9])/,
                                    message: "Password must contain at least one uppercase letter and one number"
                                }
                            })}
                            type="password"
                            className={`w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.password ? 'border-red-500' : ''}`}
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                        <input
                            {...register("confirmPassword", {
                                required: "Please confirm your password",
                                validate: value =>
                                    value === password || "Passwords do not match"
                            })}
                            type="password"
                            className={`w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-zinc-950 text-white py-3 rounded-md hover:bg-zinc-900 transition duration-300"
                    >
                        Sign Up
                    </button>
                </form>
                <div className="mt-4 flex justify-center font-semibold underline">
                    <button className="text-sm">
                        <Link to="/login">
                            Log in
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignupForm;