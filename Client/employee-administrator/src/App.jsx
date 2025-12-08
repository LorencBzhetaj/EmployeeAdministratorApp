// App.jsx
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  const user = useSelector((state) => state.auth.user);

  return (
    <Routes>
      <Route path="/login" element={user ? <Layout /> : <Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}
