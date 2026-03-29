import React from 'react';
import CommunitySidebar from './CommunitySidebar';
import { Doughnut, Bar } from 'react-chartjs-2'; // Import both Doughnut and Bar charts
import 'chart.js/auto'; // Ensure Chart.js is included
import './Dashboard.css';

const Dashboard = () => {
  const data = {
    labels: ['Biodegradables', 'Non-Biodegradables', 'Recyclables', 'Non-Recyclables', 'E-Waste'],
    datasets: [
      {
        data: [33.4, 16.4, 29.1, 18.6, 1.5],
        backgroundColor: ['#015a00', '#b8ff96', '#35a722', '#a7df8f', '#1ca445'],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'right', // Position the legend on the right side
        labels: {
          boxWidth: 20, // Size of the color boxes in the legend
          font: {
            size: 14, // Font size for legend labels
          },
        },
      },
    },
  };

  const barData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'], // Example months
    datasets: [
      {
        label: 'Biodegradables',
        data: [500, 700, 800, 650, 900, 750, 600],
        backgroundColor: '#015a00',
      },
      {
        label: 'Recyclables',
        data: [300, 400, 450, 350, 500, 400, 380],
        backgroundColor: '#35a722',
      },
      {
        label: 'Non-Biodegradables',
        data: [200, 300, 400, 300, 450, 320, 250],
        backgroundColor: '#b8ff96',
      },
    ],
  };

  const barOptions = {
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Months',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Waste Collected (kg)',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="dashboard-wrapper">
      <CommunitySidebar />
      <div className="dashboard-content">
        <h1 className="dashboard-title">DASHBOARD</h1>
        <div className="stats">
          <div className="year-box">
            <h2>
              <span className="bold">Year</span> <span className="year">2025</span>
            </h2>
          </div>
          <div className="stat-box">
            <h3>1025</h3>
            <p>Biodegradables</p>
          </div>
          <div className="stat-box">
            <h3>502</h3>
            <p>Non-Biodegradables</p>
          </div>
          <div className="stat-box">
            <h3>894</h3>
            <p>Recyclables</p>
          </div>
          <div className="stat-box">
            <h3>600</h3>
            <p>Non-Recyclables</p>
          </div>
          <div className="stat-box">
            <h3>47</h3>
            <p>E-Wastes</p>
          </div>
        </div>

        <div className="chart-container">
          <div className="info-boxes">
            <div className="info-box">
              <h3>Waste Collector</h3>
              <p>Active Collectors: 15</p>
            </div>
            <div className="info-box">
              <h3>Truck</h3>
              <p>Available Trucks: 8</p>
              <p>Trips Made: 45</p>
            </div>
            <div className="info-box">
              <h3>Waste Segregation</h3>
              <p>Biodegradables Sorted: 70%</p>
              <p>Non-Biodegradables Sorted: 50%</p>
            </div>
            <div className="info-box">
              <h3>Recycling</h3>
              <p>Recycled Items: 1,200kg</p>
              <p>Remaining Items: 300kg</p>
            </div>
          </div>
          <div className="chart-box">
            <div className="chart">
              <Doughnut data={data} options={options} />
            </div>
          </div>
        </div>


        <div className="bar-chart-container">
          <div className="graph-box">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
