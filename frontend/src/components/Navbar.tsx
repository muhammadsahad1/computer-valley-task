
import { IoLogOut } from "react-icons/io5";
import { toast } from 'react-hot-toast';
import { useSelector, useDispatch } from "react-redux";
import { setAuthenticationStatus, logout } from "../store/userSlice";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { userLogout } from "../api/auth";
import { RootState } from "../store";
import React from "react";

const Navbar: React.FC = () => {
    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const isLandingPage = location.pathname === '/';

    const handleLogin = () => {
        navigate("/login");
    };

    const handleLogout = async () => {
        try {
            const result = await userLogout();
            if (result.message === "Logged out successfully") {
                dispatch(setAuthenticationStatus(false));
                dispatch(logout());
                toast.success(result.message);
                navigate("/login");
            }
        } catch (error) {
            console.error("Logout error:", error);
            toast.error("Error logging out");
        }
    };

    return (
        <nav className="flex justify-between items-center px-6 py-4 bg-transparent backdrop-blur-sm fixed w-full top-0 left-0 z-10" style={{ height: "60px" }}>
            <div>
                <Link to={'/home'}>
                    <h1 className="text-2xl font-bold bg-gradient-to-r bg-zinc-950 bg-clip-text text-transparent hover:from-blue-550 transition-all duration-300 cursor-pointer">
                        profilePro
                    </h1>
                </Link>
            </div>
            <div>
                {isAuthenticated ? (
                    <div
                        className="flex items-center text-gray-700 cursor-pointer hover:text-blue-500 transition-colors duration-300"
                        onClick={handleLogout}
                    >
                        <IoLogOut size={24} className="mr-2" />
                        <span className="font-medium">Logout</span>
                    </div>
                ) : (
                    // Only show login button on landing page
                    isLandingPage && (
                        <button
                            className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-500 rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300 shadow-sm hover:shadow-md"
                            onClick={handleLogin}
                        >
                            Login
                        </button>
                    )
                )}
            </div>
        </nav>
    );
};

export default Navbar;