import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthContext } from 'AuthContext';

function ProtectedRoute({ children }) {
  const { isAuth } = useContext(AuthContext);

  if (isAuth === false) {
    return <Navigate to="/forbidden" replace />;
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default ProtectedRoute;
