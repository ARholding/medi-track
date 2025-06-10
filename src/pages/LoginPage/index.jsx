import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./style.css";

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    weight: '',
    height: '',
    iin: '',
    diabetes: 'нет',
    bloodGroup: '',
    rhFactor: '',
  });

  const fields = [
    { key: 'name', label: 'Имя пациента' },
    { key: 'age', label: 'Возраст' },
    { key: 'weight', label: 'Вес (кг)' },
    { key: 'height', label: 'Рост (см)' },
    { key: 'iin', label: 'ИИН' },
    { key: 'bloodGroup', label: 'Группа крови (A, B, AB, O)' },
    { key: 'rhFactor', label: 'Резус-фактор (+ или -)' },
  ];

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleLogin = () => {
    Object.entries(formData).forEach(([key, value]) => {
      localStorage.setItem(key, value);
    });
    navigate('/home');
  };

  return (
    <div className="container-login">
      <h2>Авторизация пациента</h2>

      {fields.map(({ key, label }) => (
        <div key={key} className="input-group">
          <label>{label}:</label>
          <input
            type="text"
            value={formData[key]}
            onChange={(e) => handleChange(key, e.target.value)}
          />
        </div>
      ))}

      <div className="input-group">
        <label>Инсулинозависимость:</label>
        <select
          value={formData.diabetes}
          onChange={(e) => handleChange("diabetes", e.target.value)}
        >
          <option value="да">Да</option>
          <option value="нет">Нет</option>
        </select>
      </div>

      <button className="login-button" onClick={handleLogin}>
        Войти
      </button>
    </div>
  );
}

export default LoginPage;
