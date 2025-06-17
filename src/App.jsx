import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import ProfilePage from './pages/ProfilePage';
import DefaultLayout from './layouts/DefaultLayout';
import { RecordsProvider } from './contexts/Recordscontext/index';
import { LanguageProvider } from './contexts/LanguageContext/index';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
    <RecordsProvider> 
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
    </RecordsProvider>
    </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
