import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import ProfilePage from './pages/ProfilePage/index';
import DefaultLayout from './layouts/DefaultLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/home"
          element={
            <DefaultLayout>
              <HomePage />
            </DefaultLayout>
          }
        />
        <Route
          path="/profile"
          element={
            <DefaultLayout>
              <ProfilePage />
            </DefaultLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
