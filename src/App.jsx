import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import ProtectedRoutes from './pages/ProtectedRoutes';
import UserPage from './pages/UserPage';
import SingupPage from './pages/SingupPage';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/userPage" element={<UserPage />} />
        </Route>

        <Route path="/" element={<LoginPage />} />
        <Route path="/registrarse" element={<SingupPage />} />
        <Route path="/olvido" element={<ForgotPassword />} />
      </Routes>
    </div>
  );
}

export default App;
