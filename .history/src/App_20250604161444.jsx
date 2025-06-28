import React, { useEffect, useState } from 'react';

function App() {
  const [sensorData, setSensorData] = useState({
    temperature: 0,
    humidity: 0,
    rain: 0,
    distance: 0,
  });

  useEffect(() => {
    const fetchData = () => {
      fetch('http://192.168.137.222/sensor')  // Replace with ESP32 IP
        .then(res => res.json())
        .then(data => setSensorData(data))
        .catch(err => console.error("Fetch error:", err));
    };

    fetchData(); // first call
    const interval = setInterval(fetchData, 2000); // every 2s

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Flood Detection Dashboard</h1>
      <p><strong>Temperature:</strong> {sensorData.temperature} °C</p>
      <p><strong>Humidity:</strong> {sensorData.humidity} %</p>
      <p><strong>Distance:</strong> {sensorData.distance} cm</p>
      <p><strong>Rain Detected:</strong> {sensorData.rain === 0 ? "YES" : "NO"}</p>
    </div>
  );
}

export default App;
