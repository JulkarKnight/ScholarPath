import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import App from './App.tsx';
import {LandingPage} from './components/LandingPage.tsx';
import {Login} from './components/auth/Login.tsx';
import {Register} from './components/auth/Register.tsx';
import './index.css';

const originalFetch = window.fetch;
window.fetch = async (...args) => {
  let [resource, config] = args;
  const isApiCall = typeof resource === 'string' && resource.startsWith('/api') && !resource.startsWith('/api/auth');
  if (isApiCall) {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      config = config || {};
      const headers = new Headers(config.headers);
      headers.set('Authorization', `Bearer ${token}`);
      config.headers = headers;
    }
  }
  const response = await originalFetch(resource, config);
  if (isApiCall && (response.status === 401 || response.status === 403)) {
    localStorage.removeItem('jwt_token');
    if (window.location.pathname.startsWith('/app')) {
      window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`;
    }
  }
  return response;
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/app" element={<Navigate to="/app/readiness" replace />} />
        <Route path="/app/:tab" element={<App />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
