import React from "react";
import { toast } from 'react-hot-toast';
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {

    const navigate = useNavigate();
    const location = useLocation(); // Add this to check current route

    const isLandingPage = location.pathname === '/';

    const handleLogin = () => {
        navigate("/login");
    };

    const handleLogout = async () => {
        try {


            navigate("/login");

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
                        ProfilePro
                    </h1>
                </Link>
            </div>
            <div>
                <button
                    className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-500 rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300 shadow-sm hover:shadow-md"
                    onClick={handleLogin}
                >
                    Login
                </button>

            </div>
        </nav>
    );
};

export default Navbar;