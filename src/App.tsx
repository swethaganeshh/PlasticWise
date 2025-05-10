import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { UploadProvider } from './context/UploadContext';
import HomePage from './pages/HomePage';
import UploadPage from './pages/UploadPage';
import CentersPage from './pages/CentersPage';
import EducationPage from './pages/EducationPage';

function App() {
  return (
    <ThemeProvider>
      <UploadProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/centers" element={<CentersPage />} />
            <Route path="/education" element={<EducationPage />} />
          </Routes>
        </Router>
      </UploadProvider>
    </ThemeProvider>
  );
}

export default App;