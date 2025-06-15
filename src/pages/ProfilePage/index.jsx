import React, { useState } from 'react';
import Papa from 'papaparse';
import './style.css';

const ProfilePage = () => {
  // Данные профиля из LocalStorage
  const name = localStorage.getItem('name') || '';
  const age = localStorage.getItem('age') || '';
  const weight = localStorage.getItem('weight') || '';
  const height = localStorage.getItem('height') || '';
  const iin = localStorage.getItem('iin') || '';
  const diabetes = localStorage.getItem('diabetes') || '';
  const bloodGroup = localStorage.getItem('bloodGroup') || '';
  const rhFactor = localStorage.getItem('rhFactor') || '';
  
  // Давление из LocalStorage с датой изменения
  const [systolic, setSystolic] = useState(
    localStorage.getItem("systolic") || ""
  );
  const [diastolic, setDiastolic] = useState(
    localStorage.getItem("diastolic") || ""
  );
  const [pressureLastUpdated, setPressureLastUpdated] = useState(
    localStorage.getItem("pressureLastUpdated") || ""
  );
  const [isEditing, setIsEditing] = useState(
    !systolic && !diastolic
  );

  // Обработка сохранения давления
  const handleSavePressure = () => {
    localStorage.setItem("systolic", systolic);
    localStorage.setItem("diastolic", diastolic);
    const now = new Date().toLocaleString("ru-RU");

    localStorage.setItem("pressureLastUpdated", now);
    setPressureLastUpdated(now);
    setIsEditing(false);
  };

  // Загрузка CSV с информацией об аллергиях
  const [showAllergy, setShowAllergy] = useState(false);
  const [allergies, setAllergies] = useState(() => {
    const saved = localStorage.getItem("allergies");

    return saved ? JSON.parse(saved) : []; // иначе пусто
  });

  const handleAllergyCSV = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      complete: (results) => {
        const parsed = [];

        let currentDate = '';
        for (let row of results.data) {
          if (row.length === 1 && row[0].trim()) {
            // новая дата
            currentDate = row[0].trim();
          } else if (row.length === 2) {
            parsed.push({ date: currentDate, name: row[0].trim(), result: row[1].trim() });
          }
        }

        setAllergies(parsed);
        localStorage.setItem("allergies", JSON.stringify(parsed));

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

      {/* Давление */}
      <div className="pressure-block">
        <span className="pressure-label">Артериальное давление:</span>

        {isEditing ? (
          <div className="pressure-edit">
            <div>
              <input
                className="pressure-input"
                type="number"
                value={systolic}
                onChange={(e) => setSystolic(e.target.value)}
                placeholder='верхнее'
              />
              <span> / </span>
              <input
                className="pressure-input"
                type="number"
                value={diastolic}
                onChange={(e) => setDiastolic(e.target.value)}
                placeholder='нижнее'
              />
            </div>

            <button
              className="pressure-button"
              onClick={handleSavePressure}
            >
              Сохранить
            </button>
          </div>
        ) : (
          <div className="pressure-display">
            <div className='space'>
              <span className="pressure-value">
                {systolic} / {diastolic}
              </span>
              <button
                className="pressure-button"
                onClick={() => setIsEditing(true)}
              >
                Изменить
              </button>
            </div>

            {pressureLastUpdated && (
              <p>Последнее изменение: {pressureLastUpdated}</p>
            )}

          </div>
        )}

      </div>

      <div className="patient-info">
        <p><strong>Возраст:</strong> {age}</p>
        <p><strong>Вес:</strong> {weight} кг</p>
        <p><strong>Рост:</strong> {height} см</p>
        <p><strong>Инсулинозависимость:</strong> {diabetes}</p>
      </div>

      <div className="allergy-section">
        <div
          className="allergy-header"
          onClick={() => setShowAllergy((prev) => !prev)}
        >
          <h2>Аллергии</h2>
          <span className="arrow">
            {showAllergy ? '▲' : ' ▼'}
          </span>
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
                allergies.map((item, index) => (
                    <div key={index} className="result-item">
                      <div className="info">
                        <span className="test-name">
                          {item.name}
                        </span>
                        <span className="test-date">
                          Дата: {item.date}
                        </span>
                      </div>

                      <div className="value-box">
                        <span className="test-value">
                          {item.result}
                        </span>
                      </div>
                    </div>
                ))
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

