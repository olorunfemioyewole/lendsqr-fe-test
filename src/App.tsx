import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login/login.tsx';
import Dashboard from './pages/dashboard/dashboard.tsx';
import Users from './pages/users/users.tsx';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/users" element={<Users/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;