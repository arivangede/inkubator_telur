import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const CustomChart = ({ data }) => {
    const [chartData, setChartData] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (data && data.length > 0) {
            const averagedData = processData(data);
            setChartData(averagedData);
        }
    }, [data]);

    const processData = (data) => {
        const groupedData = data.reduce((acc, item) => {
            const date = item.created_at.split("T")[0];
            if (!acc[date]) {
                acc[date] = { suhu: [], kelembaban: [] };
            }
            acc[date].suhu.push(parseFloat(item.suhu));
            acc[date].kelembaban.push(parseFloat(item.kelembaban));
            return acc;
        }, {});

        const result = Object.keys(groupedData).map((date) => {
            const suhu = groupedData[date].suhu;
            const kelembaban = groupedData[date].kelembaban;
            const avgSuhu = (
                suhu.reduce((sum, value) => sum + value, 0) / suhu.length
            ).toFixed(1);
            const avgKelembaban = (
                kelembaban.reduce((sum, value) => sum + value, 0) /
                kelembaban.length
            ).toFixed(1);
            return { date, avgSuhu, avgKelembaban };
        });

        result.sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort in ascending order

        return result;
    };

    const handleNext = () => {
        if (currentIndex + 10 < chartData.length) {
            setCurrentIndex(currentIndex + 10);
        }
    };

    const handlePrevious = () => {
        if (currentIndex - 10 >= 0) {
            setCurrentIndex(currentIndex - 10);
        }
    };

    const displayedData = chartData
        ? chartData.slice(currentIndex, currentIndex + 8)
        : [];

    const preparedChartData = {
        labels: displayedData.map((item) => item.date),
        datasets: [
            {
                label: "Rata-rata Suhu",
                data: displayedData.map((item) => item.avgSuhu),
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                fill: false,
            },
            {
                label: "Rata-rata Kelembaban",
                data: displayedData.map((item) => item.avgKelembaban),
                borderColor: "rgba(153, 102, 255, 1)",
                backgroundColor: "rgba(153, 102, 255, 0.2)",
                fill: false,
            },
        ],
    };

    return (
        <div className="w-[50%] justify-center items-center">
            <h2 className="text-3xl font-semibold text-center text-slate-700">
                Grafik Rata-Rata Suhu dan Kelembaban/Hari
            </h2>
            {chartData ? (
                <div>
                    <Line
                        data={preparedChartData}
                        options={{
                            plugins: {
                                zoom: {
                                    zoom: {
                                        wheel: {
                                            enabled: true,
                                        },
                                        pinch: {
                                            enabled: true,
                                        },
                                        mode: "x",
                                    },
                                },
                            },
                        }}
                    />
                    <div className="flex justify-center items-center gap-4 p-4">
                        <button
                            className="btn"
                            onClick={handlePrevious}
                            disabled={currentIndex === 0}
                        >
                            Previous
                        </button>
                        <button
                            className="btn"
                            onClick={handleNext}
                            disabled={currentIndex + 10 >= chartData.length}
                        >
                            Next
                        </button>
                    </div>
                </div>
            ) : (
                "Loading..."
            )}
        </div>
    );
};

export default CustomChart;
