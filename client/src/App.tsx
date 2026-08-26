import { Routes, Route, Navigate } from 'react-router';
import './App.css';
import { HomePage } from './pages/HomePage/HomePage';

function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<Navigate to="/movies" replace />} />
        <Route path="/movies" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
