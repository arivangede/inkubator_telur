import { Head, Link, router } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

function Register(props) {
    const [form, setForm] = useState({
        username: "",
        fullname: "",
        password: "",
    });

    const [error, setError] = useState({
        client: null,
    });

    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 3000);
    }, [props.errors]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        router.post("/register", {
            username: form.username,
            full_name: form.fullname,
            password: form.password,
        });
    };

    console.log(props);
    console.log(error);
    return (
        <>
            <Head title="Register" />
            <div className="min-h-screen w-full flex flex-col justify-center items-center gap-4 relative">
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
                <div className="p-4 flex flex-col justify-center items-center border border-slate-400 rounded-lg gap-4">
                    <h1 className="text-xl font-bold">Register</h1>
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
                            type="text"
                            placeholder="Fullname"
                            className="input input-bordered w-full max-w-xs"
                            value={form.fullname}
                            onChange={(e) =>
                                setForm({ ...form, fullname: e.target.value })
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
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className={`input input-bordered w-full max-w-xs ${
                                error.client &&
                                "border-red-500 focus:border-red-500 focus:outline-red-500"
                            }`}
                            onChange={(e) => {
                                const input = e.target.value;
                                if (input !== form.password) {
                                    setError({
                                        ...error,
                                        client: "Confirm password not match!",
                                    });
                                } else {
                                    setError({ ...error, client: null });
                                }
                            }}
                        />
                        {error.client && (
                            <h1 className="text-red-500 text-sm">
                                {error.client}
                            </h1>
                        )}
                        <button
                            type="submit"
                            className="btn btn-outline hover:bg-red-500 border-slate-400 text-slate-600 w-full"
                        >
                            Submit
                        </button>
                        <Link
                            href="/login"
                            className="underline self-start text-slate-500"
                        >
                            Login
                        </Link>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Register;
