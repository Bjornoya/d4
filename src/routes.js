import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Spin } from 'antd';
import ErrorPage from './ErrorPage';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './AuthContext';

const MainPage = lazy(() => import('./MainPage'));
const BirdWatcher = lazy(() => import('./BirdWatcher'));

function AppRoutes() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<Spin />}>
          <Routes>
            <Route exact path="/" element={<MainPage />} />
            <Route
              path="/bird-watcher"
              element={
                <ProtectedRoute>
                  <BirdWatcher />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default AppRoutes;
