import React, { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FaTint, FaThermometerHalf, FaCloudRain, FaRulerVertical } from 'react-icons/fa';

function App() {
  const [sensorData, setSensorData] = useState({
    temperature: 0,
    humidity: 0,
    rain: 0,
    distance: 0,
  });

  useEffect(() => {
    const fetchData = () => {
      fetch('http://192.168.137.222/sensor')
        .then(res => res.json())
        .then(data => setSensorData(data))
        .catch(err => console.error("Fetch error:", err));
    };

    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🌧️ Flood Detection Dashboard</h1>

      <div style={styles.cardContainer}>
        {/* Temperature Gauge */}
        <div style={styles.card}>
          <FaThermometerHalf size={24} color="#ff4d4f" />
          <h3>Temperature</h3>
          <div style={{ width: 100 }}>
            <CircularProgressbar
              value={sensorData.temperature}
              maxValue={60}
              text={`${sensorData.temperature}°C`}
              styles={buildStyles({
                pathColor: "#ff4d4f",
                textColor: "#ff4d4f",
                trailColor: "#ffeaea",
              })}
            />
          </div>
        </div>

        {/* Humidity Gauge */}
        <div style={styles.card}>
          <FaTint size={24} color="#1890ff" />
          <h3>Humidity</h3>
          <div style={{ width: 100 }}>
            <CircularProgressbar
              value={sensorData.humidity}
              maxValue={100}
              text={`${sensorData.humidity}%`}
              styles={buildStyles({
                pathColor: "#1890ff",
                textColor: "#1890ff",
                trailColor: "#e6f7ff",
              })}
            />
          </div>
        </div>

        {/* Rain Detection */}
        <div style={styles.card}>
          <FaCloudRain size={24} color={sensorData.rain === 0 ? "blue" : "gray"} />
          <h3>Rain</h3>
          <p style={{ fontSize: 20 }}>
            {sensorData.rain === 0 ? "☔ Yes" : "🌤️ No"}
          </p>
        </div>

        {/* Distance */}
        <div style={styles.card}>
          <FaRulerVertical size={24} color="#52c41a" />
          <h3>Water Level</h3>
          <p style={{ fontSize: 20 }}>{sensorData.distance} cm</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    textAlign: 'center',
    background: '#f0f2f5',
    minHeight: '100vh',
  },
  title: {
    color: '#001529',
    marginBottom: 30,
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 30,
  },
  card: {
    background: '#fff',
    borderRadius: 12,
    padding: 20,
    width: 200,
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
};

export default App;
