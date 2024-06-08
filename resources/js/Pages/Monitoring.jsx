import Navbar from "@/Components/Navbar";
import Table from "@/Components/Table";
import { Head } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

const Monitoring = (props) => {
    const baseUrl = import.meta.env.VITE_API_URL;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseUrl}/sensor-history`);
                setData(response.data.data);
            } catch (error) {
                console.error("errorFetch=>", error);
            } finally {
                setLoading(false);
            }
        };

        setInterval(() => {
            fetchData();
        }, 2000);
    }, []);

    return (
        <>
            <Head title="Monitoring" />
            <Navbar user={props.auth.user} />
            <div className="w-full min-h-screen flex flex-col justify-center items-center gap-8 pb-20">
                {loading ? (
                    <span className="loading loading-spinner loading-lg"></span>
                ) : (
                    <Table data={data} />
                )}
            </div>
        </>
    );
};

export default Monitoring;
