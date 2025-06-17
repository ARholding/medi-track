import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import home from "../../assets/home.svg";
import logo from "../../assets/logo.svg";
import profile from "../../assets/profile.svg";
import './style.css';
import { useLanguage } from "../../contexts/LanguageContext";
import {useTheme} from "../../contexts/ThemeContext/index"

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { messages, setCurrentLanguage, currentLanguage } = useLanguage();
    const { theme, setTheme } = useTheme();


  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <header className="header">
      <div className="logo">
        <img className="logo-img" src={logo} alt="Логотип MediTrack" />
        <h2>MediTrack</h2>
      </div>

      <div className="burger" onClick={toggleMenu}>
        <div className="bar" />
        <div className="bar" />
        <div className="bar" />
      </div>

      {/* В меню выбираешь язык */}
      

      <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <Link className="link" to="/home" onClick={() => setMenuOpen(false)}>
          <img src={home} alt="Главная" />
          {messages.home}
        </Link>
        <Link className="link" to="/profile" onClick={() => setMenuOpen(false)}>
          <img src={profile} alt="Профиль" />
          {messages.profile}
        </Link>
        <button   className="theme-button"

        onClick={() =>
          setTheme(theme === "light" ? "dark" : "light")
        }
      >
        {theme === "light" ? "Тёмная тема" : "Светлая тема"}
      </button>
      <div className="language-switch">
        <button onClick={() => setCurrentLanguage("ru")}>
          Рус
        </button>
        <button onClick={() => setCurrentLanguage("kz")}>
          Kz
        </button>
        <button onClick={() => setCurrentLanguage("en")}>
          En
        </button>
      </div>
      </nav>
    </header>
  );
};

export default Header;
