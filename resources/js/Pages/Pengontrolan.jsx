import Navbar from "@/Components/Navbar";
import { Head } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

const Pengontrolan = (props) => {
    const baseUrl = import.meta.env.VITE_API_URL;
    const [mode, setMode] = useState("otomatis");
    const [control, setControl] = useState({
        lampu: "mati",
        kipas: "mati",
    });
    const [modeDisable, setModeDisable] = useState(false);
    const [controlDisable, setControlDisable] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, []);

    useEffect(() => {
        const sendControl = async () => {
            setControlDisable(true);
            try {
                const response = await axios.post(
                    `${baseUrl}/control`,
                    control
                );
                console.log("controlResponse=>", response.data);
            } catch (error) {
                console.error("sendControlError=>", error);
            } finally {
                if (mode == "manual") {
                    setTimeout(() => setControlDisable(false), 1000);
                }
            }
        };

        sendControl();
    }, [control]);

    useEffect(() => {
        if (mode == "manual") {
            setControlDisable(false);
        } else {
            setControl({ ...control, lampu: "mati", kipas: "mati" });
            setControlDisable(true);
        }

        const sendMode = async () => {
            setModeDisable(true);
            try {
                const response = await axios.post(`${baseUrl}/mode`, {
                    command: mode,
                });
                console.log("modeResponse=>", response.data);
            } catch (error) {
                console.error("sendModeError=>", error);
            } finally {
                setTimeout(() => setModeDisable(false), 1000);
            }
        };

        sendMode();
    }, [mode]);

    return (
        <>
            <Head title="Monitoring" />
            <Navbar user={props.auth.user} />
            <div className="w-full min-h-screen flex flex-col justify-center items-center gap-8">
                {loading ? (
                    <span className="loading loading-spinner loading-lg"></span>
                ) : (
                    <>
                        {" "}
                        <div className="flex flex-col justify-center items-center">
                            <h1>Mode</h1>
                            <label className="flex cursor-pointer gap-2">
                                <span className="label-text">Otomatis</span>
                                <input
                                    type="checkbox"
                                    value="synthwave"
                                    className="toggle"
                                    disabled={modeDisable}
                                    checked={mode == "manual" ? true : false}
                                    onChange={(e) =>
                                        e.target.checked
                                            ? setMode("manual")
                                            : setMode("otomatis")
                                    }
                                />
                                <span className="label-text">Manual</span>
                            </label>
                        </div>
                        <div className="flex flex-row justify-center items-center gap-8">
                            <div className="flex flex-col justify-center items-center">
                                <h1>Lampu</h1>
                                <label className="flex cursor-pointer gap-2">
                                    <span className="label-text">off</span>
                                    <input
                                        type="checkbox"
                                        value="synthwave"
                                        className="toggle"
                                        disabled={controlDisable}
                                        checked={
                                            control.lampu == "hidup"
                                                ? true
                                                : false
                                        }
                                        onChange={(e) =>
                                            e.target.checked
                                                ? setControl({
                                                      ...control,
                                                      lampu: "hidup",
                                                  })
                                                : setControl({
                                                      ...control,
                                                      lampu: "mati",
                                                  })
                                        }
                                    />
                                    <span className="label-text">on</span>
                                </label>
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                <h1>Kipas</h1>
                                <label className="flex cursor-pointer gap-2">
                                    <span className="label-text">off</span>
                                    <input
                                        type="checkbox"
                                        value="synthwave"
                                        className="toggle theme-controller"
                                        disabled={controlDisable}
                                        checked={
                                            control.kipas == "hidup"
                                                ? true
                                                : false
                                        }
                                        onChange={(e) =>
                                            e.target.checked
                                                ? setControl({
                                                      ...control,
                                                      kipas: "hidup",
                                                  })
                                                : setControl({
                                                      ...control,
                                                      kipas: "mati",
                                                  })
                                        }
                                    />
                                    <span className="label-text">on</span>
                                </label>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Pengontrolan;
