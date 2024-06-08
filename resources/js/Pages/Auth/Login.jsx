import { Head, Link, router } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

function Login(props) {
    const [form, setForm] = useState({
        username: "",
        password: "",
    });
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 3000);
    }, [props.errors]);

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post("/login", form);
    };

    console.log(props);
    return (
        <>
            <Head title="Login" />
            <div className="min-h-screen w-full flex flex-col justify-center items-center relative">
                <div
                    role="alert"
                    className={`alert alert-error max-w-80 absolute top-0 transition duration-300 -translate-y-full ${
                        showAlert &&
                        Object.keys(props.errors).length > 0 &&
                        "translate-y-0"
                    }`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="stroke-current shrink-0 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <div className="flex flex-col justify-center items-center">
                        {Object.values(props.errors).map((item, index) => (
                            <span key={index}>{item}</span>
                        ))}
                    </div>
                </div>
                <div
                    role="alert"
                    className={`alert alert-success max-w-80 absolute top-0 transition duration-300 -translate-y-full ${
                        showAlert && props.flash.message && "translate-y-0"
                    }`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="stroke-current shrink-0 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <span>{props.flash.message}</span>
                </div>
                <div className="p-4 flex flex-col justify-center items-center border border-slate-400 rounded-lg gap-4">
                    <h1 className="text-xl font-bold">Login</h1>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col justify-center items-center gap-2"
                    >
                        <input
                            type="text"
                            placeholder="Username"
                            className="input input-bordered w-full max-w-xs"
                            value={form.username}
                            onChange={(e) =>
                                setForm({ ...form, username: e.target.value })
                            }
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="input input-bordered w-full max-w-xs"
                            value={form.password}
                            onChange={(e) =>
                                setForm({ ...form, password: e.target.value })
                            }
                        />
                        <button
                            type="submit"
                            className="btn btn-outline hover:bg-red-500 border-slate-400 text-slate-600 w-full"
                        >
                            Submit
                        </button>
                        <Link
                            href="/register"
                            className="underline self-start text-slate-500"
                        >
                            Register
                        </Link>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;
