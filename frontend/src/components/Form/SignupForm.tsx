import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { UserSignupData } from '../../types/user';
import { createUser } from '../../api/auth';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setAuthenticationStatus, setUserDetails } from '../../store/userSlice';

const SignupForm: React.FC = () => {
    const [loading, setLoading] = useState(false)
    const navigator = useNavigate()
    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<UserSignupData>();

    const password = watch("password");

    const onSubmit = async (data: UserSignupData) => {
        setLoading(true)
        try {
            const result = await createUser(data)
            console.log(result)
            if (result?.success) {
                // set user details in redux store
                dispatch(setUserDetails(result.userData))
                dispatch(setAuthenticationStatus(true))
                toast.success("Registration successful")
                navigator('/home')

            } else {
                toast.error(`${result?.error}`)
            }
        } catch (error) {
            toast.error("An error occurred")
        }
        setLoading(false)
    };

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="w-full max-w-md bg-white rounded-lg p-6 shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center text-zinc-950">Create Account</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            })}
                            type="email"
                            className={`w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : ''}`}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
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
                            className={`w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.username ? 'border-red-500' : ''}`}
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
                            className={`w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? 'border-red-500' : ''}`}
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                        <input
                            {...register("confirmPassword", {
                                required: "Please confirm your password",
                                validate: value => value === password || "Passwords do not match"
                            })}
                            type="password"
                            className={`w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-zinc-950 text-white py-3 rounded-md hover:bg-zinc-900 transition duration-300 disabled:opacity-50"
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>
                <div className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="font-semibold text-zinc-950 hover:underline">
                        Log in
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignupForm;