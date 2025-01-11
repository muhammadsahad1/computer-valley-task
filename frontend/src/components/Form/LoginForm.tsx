import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { UserLoginData } from '../../types/user'; // Adjust the type for login
import { loginUser } from '../../api/auth'; // Make sure you have the login API function
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthenticationStatus, setUserDetails } from '../../store/userSlice';
import { RootState } from '../../store';

const LoginForm: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const isAuth = useSelector((state: RootState) => state.user.isAuthenticated);
    const navigator = useNavigate();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<UserLoginData>();

    const onSubmit = async (data: UserLoginData) => {
        setLoading(true);
        try {
            const result = await loginUser(data);
            if (result?.status === 200) {
                dispatch(setUserDetails(result.userData));
                dispatch(setAuthenticationStatus(!isAuth));
                toast.success('Login successful');
                navigator('/home');
            } else {
                toast.error(`${result?.error}`);
            }
        } catch (error) {
            toast.error('An error occurred');
        }
        setLoading(false);
    };

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="w-full max-w-md bg-white rounded-lg p-6 shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center text-zinc-950">Login to Your Account</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Invalid email address'
                                }
                            })}
                            type="email"
                            className={`w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : ''}`}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters'
                                }
                            })}
                            type="password"
                            className={`w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? 'border-red-500' : ''}`}
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-zinc-950 text-white py-3 rounded-md hover:bg-zinc-900 transition duration-300 disabled:opacity-50"
                    >
                        {loading ? 'Logging in...' : 'Log in'}
                    </button>
                </form>
                <div className="mt-4 text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/signup" className="font-semibold text-zinc-950 hover:underline">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
