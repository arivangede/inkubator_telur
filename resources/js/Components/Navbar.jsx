import { Link, router, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineUser } from "react-icons/ai";

const Navbar = ({ user }) => {
    const [popMenu, setPopMenu] = useState(false);
    const { url } = usePage();

    const handlePopMenu = () => {
        setPopMenu(!popMenu);
    };

    const handleLogOut = () => {
        router.post("/logout");
    };

    return (
        <div className="p-4 flex flex-row justify-between items-center z-50 w-full relative">
            <div className="w-full">
                <Link
                    href="/"
                    className="text-xl font-bold hover:text-red-500 transition duration-300"
                >
                    Inkubator Telur
                </Link>
            </div>
            <div className="w-full flex flex-col">
                <button
                    onClick={handlePopMenu}
                    className="btn btn-circle hover:bg-red-500 hover:text-white self-end sm:hidden"
                >
                    <AiOutlineMenu />
                </button>

                <div
                    className={`${
                        popMenu == false ? "scale-0" : ""
                    } transition duration-300 origin-top-right flex flex-col absolute top-full right-4 p-4 rounded-lg border border-slate-300 gap-4 bg-white sm:flex-row sm:border-none sm:scale-100 sm:static sm:self-center`}
                >
                    <Link
                        href="/"
                        className={`${
                            url == "/" && "text-red-500"
                        } hover:text-red-500 transition duration-300`}
                    >
                        Beranda
                    </Link>
                    <Link
                        href="/monitoring"
                        className={`${
                            url == "/monitoring" && "text-red-500"
                        } hover:text-red-500 transition duration-300`}
                    >
                        Monitoring
                    </Link>
                    <Link
                        href="/pengontrolan"
                        className={`${
                            url == "/pengontrolan" && "text-red-500"
                        } hover:text-red-500 transition duration-300`}
                    >
                        Pengontrolan
                    </Link>
                    <div className="bg-red-200 p-4 rounded-lg flex flex-col gap-3 sm:hidden">
                        <div>
                            <h4>{user.full_name}</h4>
                            <h3>{user.username}</h3>
                        </div>
                        <button
                            className="btn btn-outline hover:bg-red-500"
                            onClick={handleLogOut}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            <div className="w-full sm:flex flex-col hidden">
                <div className="dropdown hidden self-end sm:block">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-circle hover:bg-red-500 hover:text-white transition duration-300"
                    >
                        <AiOutlineUser size={28} />
                    </div>
                    <div
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 right-0 gap-3"
                    >
                        <div>
                            <h4>{user.full_name}</h4>
                            <h3>{user.username}</h3>
                        </div>
                        <button
                            className="btn btn-outline hover:bg-red-500"
                            onClick={handleLogOut}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
