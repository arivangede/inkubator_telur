import Navbar from "@/Components/Navbar";
import { Head, router } from "@inertiajs/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Beranda = (props) => {
    const baseUrl = import.meta.env.VITE_API_URL;
    const [suhu, setSuhu] = useState(0);
    const [kelembaban, setKelembaban] = useState(0);
    const [loading, setLoading] = useState(true);

    const persentaseSuh = Math.floor((suhu / 45) * 100).toFixed(2);
    const persentaseKel = Math.floor((kelembaban / 100) * 100).toFixed(2);

    const suhuColor = () => {
        if (suhu < 30) {
            return "bg-sky-400";
        } else if (suhu >= 30 && suhu < 35) {
            return "bg-amber-400";
        } else if (suhu >= 35) {
            return "bg-red-400";
        }
    };

    const kelembabanColor = () => {
        if (kelembaban < 60) {
            return "bg-red-400";
        } else if (kelembaban >= 60 && kelembaban < 65) {
            return "bg-amber-400";
        } else if (kelembaban >= 65) {
            return "bg-sky-400";
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`
                    ${baseUrl}/data-sensor
                `);
                const data = response.data.data;
                setKelembaban(data.kelembaban);
                setSuhu(data.suhu);
            } catch (error) {
                console.error("errorFetch=>", error);
            } finally {
                setLoading(false);
            }
        };

        setInterval(fetchData, 5000);
    }, []);

    return (
        <>
            <Head title="Beranda" />
            <Navbar user={props.auth.user} />
            <div className="w-full min-h-screen flex flex-col gap-8 justify-center items-center">
                <div className="w-full flex justify-center items-center gap-8 flex-wrap">
                    <div className="flex flex-col justify-center items-center gap-4">
                        <div className="border border-slate-500 w-80 flex justify-center items-center py-4">
                            <h1 className="font-bold text-lg">Suhu</h1>
                        </div>

                        <svg
                            fill="#000000"
                            viewBox="0 0 32 32"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            height="200px"
                            width="200px"
                        >
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g
                                id="SVGRepo_tracerCarrier"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                                <title>temperature-high</title>
                                <path d="M20.75 6.008c0-6.246-9.501-6.248-9.5 0v13.238c-1.235 1.224-2 2.921-2 4.796 0 3.728 3.022 6.75 6.75 6.75s6.75-3.022 6.75-6.75c0-1.875-0.765-3.572-2-4.796l-0.001-0zM16 29.25c-2.9-0-5.25-2.351-5.25-5.251 0-1.553 0.674-2.948 1.745-3.909l0.005-0.004 0.006-0.012c0.13-0.122 0.215-0.29 0.231-0.477l0-0.003c0.001-0.014 0.007-0.024 0.008-0.038l0.006-0.029v-13.52c-0.003-0.053-0.005-0.115-0.005-0.178 0-1.704 1.381-3.085 3.085-3.085 0.060 0 0.12 0.002 0.179 0.005l-0.008-0c0.051-0.003 0.11-0.005 0.17-0.005 1.704 0 3.085 1.381 3.085 3.085 0 0.063-0.002 0.125-0.006 0.186l0-0.008v13.52l0.006 0.029 0.007 0.036c0.015 0.191 0.101 0.36 0.231 0.482l0 0 0.006 0.012c1.076 0.966 1.75 2.361 1.75 3.913 0 2.9-2.35 5.25-5.25 5.251h-0zM16.75 21.367v-15.367c0-0.414-0.336-0.75-0.75-0.75s-0.75 0.336-0.75 0.75v0 15.367c-1.164 0.338-2 1.394-2 2.646 0 1.519 1.231 2.75 2.75 2.75s2.75-1.231 2.75-2.75c0-1.252-0.836-2.308-1.981-2.641l-0.019-0.005zM26.5 2.25c-1.795 0-3.25 1.455-3.25 3.25s1.455 3.25 3.25 3.25c1.795 0 3.25-1.455 3.25-3.25v0c-0.002-1.794-1.456-3.248-3.25-3.25h-0zM26.5 7.25c-0.966 0-1.75-0.784-1.75-1.75s0.784-1.75 1.75-1.75c0.966 0 1.75 0.784 1.75 1.75v0c-0.001 0.966-0.784 1.749-1.75 1.75h-0z"></path>{" "}
                            </g>
                        </svg>

                        <div className="border border-slate-500 w-80 flex justify-center items-center py-4">
                            <span className="font-bold">{suhu}°C</span>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-4">
                        <div className="border border-slate-500 w-80 flex justify-center items-center py-4">
                            <h1 className="font-bold text-lg">Kelembaban</h1>
                        </div>

                        <svg
                            fill="#000000"
                            height="200px"
                            width="200px"
                            version="1.1"
                            id="Capa_1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 328.611 328.611"
                            xml:space="preserve"
                        >
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g
                                id="SVGRepo_tracerCarrier"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                                <g>
                                    <path d="M209.306,50.798c-2.452-3.337-7.147-4.055-10.485-1.602c-3.338,2.453-4.055,7.147-1.603,10.485 c54.576,74.266,66.032,123.541,66.032,151.8c0,27.691-8.272,52.794-23.293,70.685c-17.519,20.866-42.972,31.446-75.651,31.446 c-73.031,0-98.944-55.018-98.944-102.131c0-52.227,28.103-103.234,51.679-136.829c25.858-36.847,52.11-61.415,52.37-61.657 c3.035-2.819,3.209-7.565,0.39-10.6c-2.819-3.034-7.565-3.209-10.599-0.39c-1.11,1.031-27.497,25.698-54.254,63.765 c-24.901,35.428-54.586,89.465-54.586,145.71c0,31.062,9.673,59.599,27.236,80.353c20.361,24.061,50.345,36.779,86.708,36.779 c36.794,0,66.926-12.726,87.139-36.801c17.286-20.588,26.806-49.117,26.806-80.33C278.25,156.216,240.758,93.597,209.306,50.798z"></path>
                                    <path d="M198.43,148.146l-95.162,95.162c-2.929,2.929-2.929,7.678,0,10.606c1.465,1.464,3.385,2.197,5.304,2.197 s3.839-0.732,5.304-2.197l95.162-95.162c2.929-2.929,2.929-7.678,0-10.606C206.107,145.217,201.359,145.217,198.43,148.146z"></path>
                                    <path d="M191.965,207.899c-13.292,0-24.106,10.814-24.106,24.106s10.814,24.106,24.106,24.106s24.106-10.814,24.106-24.106 S205.257,207.899,191.965,207.899z M191.965,241.111c-5.021,0-9.106-4.085-9.106-9.106s4.085-9.106,9.106-9.106 s9.106,4.085,9.106,9.106S196.986,241.111,191.965,241.111z"></path>
                                    <path d="M125.178,194.162c13.292,0,24.106-10.814,24.106-24.106s-10.814-24.106-24.106-24.106s-24.106,10.814-24.106,24.106 S111.886,194.162,125.178,194.162z M125.178,160.949c5.021,0,9.106,4.085,9.106,9.106s-4.085,9.106-9.106,9.106 c-5.021,0-9.106-4.085-9.106-9.106S120.156,160.949,125.178,160.949z"></path>
                                </g>
                            </g>
                        </svg>

                        <div className="border border-slate-500 w-80 flex justify-center items-center py-4">
                            <span>{kelembaban}% RH</span>
                        </div>
                    </div>
                </div>
                {loading && (
                    <div className="flex flex-col justify-center items-center">
                        <span className="loading loading-spinner loading-lg"></span>
                        <h1>Menghubungkan</h1>
                    </div>
                )}
            </div>
        </>
    );
};

export default Beranda;
