import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import home from "../../assets/home.svg";
import logo from "../../assets/logo.svg";
import profile from "../../assets/profile.svg";
import './style.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <header className="header">
      <div className="logo">
        <img className="logo-img" src={logo} alt="Logo" />
        <h2>MediTrack</h2>
      </div>

      <div className="burger" onClick={toggleMenu}>
        <div className="bar" />
        <div className="bar" />
        <div className="bar" />
      </div>

      <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <Link className="link" to="/home" onClick={() => setMenuOpen(false)}>
          <img src={home} alt="home" />
          Главная
        </Link>
        <Link className="link" to="/profile" onClick={() => setMenuOpen(false)}>
          <img src={profile} alt="profile" />
          Профиль
        </Link>
      </nav>
    </header>
  );
};

export default Header;
