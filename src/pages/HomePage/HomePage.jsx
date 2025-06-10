import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import Papa from 'papaparse';
import './style.css';

const HomePage = () => {
  const name = localStorage.getItem('name');
  const iin = localStorage.getItem('iin');
  const bloodtype = localStorage.getItem('bloodGroup');
  const Rh = localStorage.getItem('rhFactor');

  const [recordsList, setRecordsList] = useState([]);
  const [expandedChart, setExpandedChart] = useState(null); // теперь одна строка — имя активного графика

  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      complete: (results) => {
        const lines = results.data.filter(
          (line) => line.length > 1 || /^\d{2}\.\d{2}\.\d{4}$/.test(line[0])
        );
        let currentDate = '';
        let record = {};
        const newRecords = [];

        lines.forEach((line) => {
          if (line.length === 1 && /^\d{2}\.\d{2}\.\d{4}$/.test(line[0])) {
            if (Object.keys(record).length > 1 && record.date) {
              newRecords.push({ ...record });
            }
            currentDate = line[0];
            record = { date: currentDate };
          } else if (line.length >= 2) {
            const key = line[0].trim();
            const value = parseFloat(line[1]);
            record[key] = value;
          }
        });

        if (Object.keys(record).length > 1) {
          newRecords.push(record);
        }

        setRecordsList((prev) => {
          const updatedList = [...prev, ...newRecords];
          return updatedList
            .filter((r) => r.date)
            .sort((a, b) => {
              const [d1, m1, y1] = a.date.split('.').map(Number);
              const [d2, m2, y2] = b.date.split('.').map(Number);
              return new Date(y2, m2 - 1, d2) - new Date(y1, m1 - 1, d1);
            });
        });
      },
      error: (err) => alert('Ошибка при чтении CSV файла: ' + err.message),
    });
  };

  const toggleChart = (metric) => {
    setExpandedChart((prev) => (prev === metric ? null : metric));
  };

  const allMetrics = Array.from(
    new Set(recordsList.flatMap((record) => Object.keys(record).filter((k) => k !== 'date')))
  );

  const metricHistory = (metric) =>
    recordsList
      .map((record) => ({
        date: record.date,
        value: record[metric] ?? null,
      }))
      .filter((entry) => entry.value !== null)
      .sort((a, b) => {
        const [d1, m1, y1] = a.date.split('.').map(Number);
        const [d2, m2, y2] = b.date.split('.').map(Number);
        return new Date(y1, m1 - 1, d1) - new Date(y2, m2 - 1, d2);
      });

  return (
    <div className="home-container">
      <h1 className="profile-header">Главная</h1>

      <div className="all-info">
        <div className="info-patient">
          <h2 className="name">{name}</h2>
          <h2 className="iin">{iin}</h2>
        </div>
        <div className="blood-info">
          <h3 className="bloodtype">{bloodtype}</h3>
          <h3 className="Rh">{Rh}</h3>
        </div>
      </div>
       {/* График сверху */}
      {expandedChart && (
        <div className="chart-window">
  <h3>График анализа: {expandedChart}</h3>
  <div className="chart-wrapper">
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={metricHistory(expandedChart)}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip
          formatter={(value) => [value, expandedChart]}
          labelFormatter={(label) => `Дата: ${label}`}
        />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  </div>
</div>
      )}
      <div className="csv-upload">
        <label htmlFor="csvInput" className="upload-label">
          Загрузить анализы (CSV)
        </label>
        <input
          type="file"
          accept=".csv"
          id="csvInput"
          style={{ display: 'none' }}
          onChange={handleCSVUpload}
        />
      </div>

      <div className="results-list">
        {recordsList.map((record, index) => (
          <div key={index} className="pdf-content">
            {Object.entries(record)
              .filter(([k]) => k !== 'date')
              .map(([key, value]) => (
                <div className="result-item" key={key + index}>
                  <div className="info">
                    <span className="test-name">{key}</span>
                    <span className="test-date">Дата: {record.date}</span>
                  </div>
                  <div className="value-box">
                    <span className="test-value">{value}</span>
                    <button className="graph-button" onClick={() => toggleChart(key)}>
                      ▶
                    </button>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
