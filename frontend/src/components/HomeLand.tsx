import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from '../store'


const HomeComponent = () => {
    const user = useSelector((state: RootState) => state.user);


    console.log("user", user)
    return (
        <div className="max-w-6xl p-4 w-full bg-black min-h-screen bg-gradient-to-r from-blue-300 to-white justify-center items-center">
            <div className='flex flex-col md:flex-row justify-around items-center'>

                <div className="mt-16 md:mt-32 text-center md:text-left">
                    {user.isAuthenticated ? (
                        <>
                            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                                Welcome, <span className="text-blue-600">{user.username}</span>
                                <br />
                                Manage Your Profile
                                <br />
                                <span className="text-blue-600">Your Data, Your Control</span>
                            </h2>
                            <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-700">
                                You are logged in. Edit your profile, manage your settings, or explore more features.
                            </p>
                            <div className="mt-10">
                                <Link to={'/profile'}>
                                    <button className="rounded-md px-6 py-3 sm:px-8 sm:py-2 font-semibold bg-black hover:bg-zinc-900 transition-shadow text-white">
                                        Manage Profile
                                    </button>
                                </Link>
                            </div>
                        </>
                    ) : (
                        <>
                            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                                Manage Your Profile <br />
                                Seamlessly and Securely <br />
                                <span className="text-blue-600">Your Data, Your Control</span>
                            </h2>
                            <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-700">
                                Sign up, log in, edit your profile, and manage your account settings with ease.
                            </p>

                            <div className='flex justify-center mt-10'>
                                <Link to={'/signup'}>
                                    <button className='rounded-md px-6 py-3 sm:px-8 sm:py-2 font-semibold bg-black hover:bg-zinc-900 transition-shadow text-white'>
                                        Get Started
                                    </button>
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomeComponent;
