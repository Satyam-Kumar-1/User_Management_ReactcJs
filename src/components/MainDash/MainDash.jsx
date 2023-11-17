import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import "./MainDash.css";
const url='https://user-management-server-d71b.onrender.com/';

const MainDash = () => {
  const [monthlyChartData, setMonthlyChartData] = useState({
    labels: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ],
    datasets: [
      {
        label: "Monthly User Creation",
        data: Array(12).fill(0), // Initialize with zeros for each month
        fill: false,
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  });

  const [yearlyChartData, setYearlyChartData] = useState({
    labels: Array.from({ length: 2026 - 2021 + 1 }, (_, index) => (2021 + index).toString()), // Years from 2021 to 2026
    datasets: [
      {
        label: "Yearly User Creation",
        data: Array(2026 - 2021 + 1).fill(0), // Initialize with zeros for each year
        fill: false,
        borderColor: "rgba(192,75,192,1)",
      },
    ],
  });

  const monthlyChartRef = useRef(null);
  const yearlyChartRef = useRef(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}api/users/all`);
        const userData = await response.json();
  
        const labelsByMonth = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
  
        const monthlyData = Array(labelsByMonth.length).fill(0);
  
        const yearlyData = Array.from({ length: 2030 - 2021 + 1 }, (_, index) => {
          const year = (2021 + index).toString();
          return {
            label: year,
            data: 0,
          };
        });
  
        userData.forEach(user => {
          const monthIndex = new Date(user.creationDate).getMonth();
          monthlyData[monthIndex] += 1;
  
          const year = new Date(user.creationDate).getFullYear();
          const yearLabel = year.toString();
          const yearIndex = yearlyData.findIndex(item => item.label === yearLabel);
          if (yearIndex !== -1) {
            yearlyData[yearIndex].data += 1;
          }
        });
  
        setMonthlyChartData({
          labels: labelsByMonth,
          datasets: [
            {
              label: "Monthly User Creation",
              data: monthlyData,
              fill: false,
              borderColor: "rgba(75,192,192,1)",
            },
          ],
        });
  
        setYearlyChartData({
          labels: yearlyData.map(item => item.label),
          datasets: [
            {
              label: "Yearly User Creation",
              data: yearlyData.map(item => item.data),
              fill: false,
              borderColor: "rgba(192,75,192,1)",
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);
  

  useEffect(() => {
    // Create the monthly chart instance
    const monthlyCtx = monthlyChartRef.current.getContext("2d");
    const monthlyChartInstance = new Chart(monthlyCtx, {
      type: "line",
      data: monthlyChartData,
      options: {
        scales: {
          x: {
            type: "category",
            labels: monthlyChartData.labels,
            ticks: {
              autoSkip: false, // Prevent auto-skipping of labels
              maxRotation: 45, // Rotate labels at a 45-degree angle
              minRotation: 45, // Rotate labels at a 45-degree angle
            },
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Cleanup the previous monthly chart instance
    return () => {
      monthlyChartInstance.destroy();
    };
  }, [monthlyChartData]);

  useEffect(() => {
    // Create the yearly chart instance
    const yearlyCtx = yearlyChartRef.current.getContext("2d");
    const yearlyChartInstance = new Chart(yearlyCtx, {
      type: "line",
      data: yearlyChartData,
      options: {
        scales: {
          x: {
            type: "category",
            labels: yearlyChartData.labels,
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Cleanup the previous yearly chart instance
    return () => {
      yearlyChartInstance.destroy();
    };
  }, [yearlyChartData]);

  return (
    <div className="MainDash">
      <div className="bg-gray-400 text-gray p-1 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-2 text-center">Dashboard</h2>
      </div>

      {/* Monthly Line Chart */}
      <div className="line-chart-container">
        <canvas ref={monthlyChartRef}></canvas>
      </div>

      {/* Yearly Line Chart */}
      <div className="line-chart-container">
        <canvas ref={yearlyChartRef}></canvas>
      </div>
    </div>
  );
};

export default MainDash;
