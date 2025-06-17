import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./style.css";

import { useLanguage } from "../../contexts/LanguageContext";

const LoginPage = () => {
  const navigate = useNavigate();

  // Используем язык из контекста
  const { messages, currentLanguage, setCurrentLanguage } = useLanguage();

  const [formData, setFormData] = useState({ 
    name: '',
    age: '',
    weight: '',
    height: '',
    iin: '',
    diabetes: 'нет',
    bloodGroup: '',
    rhFactor: '' 
  });

  const fields = [
    { key: 'name', label: messages.namePatient },
    { key: 'age', label: messages.age },
    { key: 'weight', label: messages.weight },
    { key: 'height', label: messages.height },
    { key: 'iin', label: messages.iin },
    { key: 'bloodGroup', label: messages.bloodGroup },
    { key: 'rhFactor', label: messages.rhFactor },
  ];

  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleLogin = () => {
    Object.entries(formData).forEach(([key, value]) => {
      localStorage.setItem(key, value);
    });
    navigate('/home');
  };

  return (
    <div className="container-login">
      <h2>{messages.loginPatient}</h2>

      {/* Кнопки выбора языка */}
      <div className="language-switch">
        <button 
          disabled={currentLanguage === "ru"}
          onClick={() => setCurrentLanguage("ru")}>
          Русский
        </button>
        <button
          disabled={currentLanguage === "en"}
          onClick={() => setCurrentLanguage("en")}>
          English
        </button>
        <button
          disabled={currentLanguage === "kz"}
          onClick={() => setCurrentLanguage("kz")}>
          Қазақша
        </button>
      </div>

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
        <label>{messages.diabetes}:</label>
        <select
          value={formData.diabetes}
          onChange={(e) => handleChange("diabetes", e.target.value)}
        >
          <option value="да">{messages.yes}</option>
          <option value="нет">{messages.no}</option>
        </select>
      </div>

      <button className="login-button" onClick={handleLogin}>
        {messages.login}
      </button>
    </div>
  );
}

export default LoginPage;
