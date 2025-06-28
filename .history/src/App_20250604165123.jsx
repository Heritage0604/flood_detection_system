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
      <h1 style={styles.title}>🌊 Flood Detection Dashboard</h1>

      <div style={styles.cardContainer}>
        {/* Temperature Gauge */}
        <div style={styles.card}>
          <FaThermometerHalf size={36} color="#ff4d4f" />
          <h2>Temperature</h2>
          <div style={{ width: 140, margin: '0 auto' }}>
            <CircularProgressbar
              value={sensorData.temperature}
              maxValue={60}
              text={`${sensorData.temperature}°C`}
              styles={buildStyles({
                pathColor: "#ff4d4f",
                textColor: "#ff4d4f",
                trailColor: "#ffeaea",
                textSize: "16px",
              })}
            />
          </div>
        </div>

        {/* Humidity Gauge */}
        <div style={styles.card}>
          <FaTint size={36} color="#1890ff" />
          <h2>Humidity</h2>
          <div style={{ width: 140, margin: '0 auto' }}>
            <CircularProgressbar
              value={sensorData.humidity}
              maxValue={100}
              text={`${sensorData.humidity}%`}
              styles={buildStyles({
                pathColor: "#1890ff",
                textColor: "#1890ff",
                trailColor: "#e6f7ff",
                textSize: "16px",
              })}
            />
          </div>
        </div>

        {/* Rain Detection */}
        <div style={styles.card}>
          <FaCloudRain size={36} color={sensorData.rain === 0 ? "blue" : "gray"} />
          <h2>Rain</h2>
          <p style={styles.valueText}>
            {sensorData.rain === 0 ? "☔ Yes" : "🌤️ No"}
          </p>
        </div>

        {/* Distance */}
        <div style={styles.card}>
          <FaRulerVertical size={36} color="#52c41a" />
          <h2>Water Level</h2>
          <p style={styles.valueText}>{sensorData.distance} cm</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Segoe UI, sans-serif',
    padding: '40px 60px',
    background: '#f0f2f5',
    minHeight: '100vh',
  },
  title: {
    fontSize: '36px',
    fontWeight: 700,
    color: '#001529',
    marginBottom: 50,
    textAlign: 'center',
  },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '40px',
    justifyContent: 'center',
  },
  card: {
    background: '#fff',
    borderRadius: 16,
    padding: 30,
    boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  valueText: {
    fontSize: '24px',
    fontWeight: 600,
    marginTop: 20,
  },
};

export default App;
