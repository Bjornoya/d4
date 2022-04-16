import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Spin } from 'antd';
import ErrorPage from './ErrorPage';
import ProtectedRoute from './components/ProtectedRoute';

const MainPage = lazy(() => import('./MainPage'));
const BirdWatcher = lazy(() => import('./BirdWatcher'));

function AppRoutes() {
  const isAuth = false;
  return (
    <Router>
      <Suspense fallback={<Spin />}>
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route
            path="/bird-watcher"
            element={
              <ProtectedRoute isAuth={isAuth}>
                <BirdWatcher />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default AppRoutes;
