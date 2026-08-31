import { Routes, Route, Navigate } from 'react-router';
import './App.css';
import { HomePage } from './pages/HomePage/HomePage';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="*" element={<Navigate to="/movies" replace />} />
        <Route path="/movies" element={<HomePage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
