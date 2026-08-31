import { Routes, Route, Navigate } from 'react-router';
import './App.css';
import { HomePage } from './pages/HomePage/HomePage';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { SignUpPage } from './pages/SignUpPage/SignUpPage';
import { PublicOnlyRoute } from './components/RouteGuards';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/movies" element={<HomePage />} />
        <Route element={<PublicOnlyRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/movies" replace />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
