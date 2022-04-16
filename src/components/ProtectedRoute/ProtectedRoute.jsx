import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function ProtectedRoute({ isAuth, children }) {
  if (!isAuth) {
    return <Navigate to="/forbidden" replace />;
  }

  return children;
}

ProtectedRoute.defaultProps = {
  isAuth: false,
};

ProtectedRoute.propTypes = {
  isAuth: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default ProtectedRoute;
