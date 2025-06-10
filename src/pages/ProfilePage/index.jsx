import React, { useState } from 'react';
import Papa from 'papaparse';
import './style.css';

const ProfilePage = () => {
  const name = localStorage.getItem('name');
  const age = localStorage.getItem('age');
  const weight = localStorage.getItem('weight');
  const height = localStorage.getItem('height');
  const iin = localStorage.getItem('iin');
  const diabetes = localStorage.getItem('diabetes');
  const bloodGroup = localStorage.getItem('bloodGroup');
  const rhFactor = localStorage.getItem('rhFactor');

  const [showAllergy, setShowAllergy] = useState(false);
  const [allergies, setAllergies] = useState([]);
  const [bloodPressure, setBloodPressure] = useState('--/--');

  const handleAllergyCSV = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      complete: (results) => {
        const parsed = results.data.flat().filter((item) => item && item.trim() !== '');
        setAllergies(parsed);
      },
      error: (err) => alert('Ошибка при чтении файла: ' + err.message),
    });
  };

  return (
    <div className="profile-container">
      <h1 className="profile-header">Профиль пациента</h1>
      <div className="all-info">
        <div className="info-patient">
          <h2 className="name">{name}</h2>
          <h2 className="iin">{iin}</h2>
        </div>
        <div className="blood-info">
          <h3 className="bloodtype">{bloodGroup}</h3>
          <h3 className="Rh">{rhFactor}</h3>
        </div>
      </div>

      <div className="pressure-block">
        <span className="pressure-label">Артериальное давление:</span>
        <span className="pressure-value">{bloodPressure}</span>
        <span>mmHg</span>
      </div>

      <div className="patient-info">
        <p><strong>Возраст:</strong> {age}</p>
        <p><strong>Вес:</strong> {weight} кг</p>
        <p><strong>Рост:</strong> {height} см</p>
        <p><strong>Инсулинозависимость:</strong> {diabetes}</p>
      </div>

      <div className="allergy-section">
        <div className="allergy-header" onClick={() => setShowAllergy((prev) => !prev)}>
          <h2>Аллергии</h2>
          <span className="arrow">{showAllergy ? '▲' : '▼'}</span>
        </div>

        {showAllergy && (
          <div className="allergy-body">
            <label className="upload-label">
              Загрузить аллергенный список (CSV)
              <input
                type="file"
                accept=".csv"
                onChange={handleAllergyCSV}
                style={{ display: 'none' }}
              />
            </label>

            <div className="allergy-list">
              {allergies.length > 0 ? (
                <ul>
                  {allergies.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p>Аллергии не загружены.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
