import { createContext, useState, useMemo, useLayoutEffect } from 'react';
import { gql, GraphQLClient } from 'graphql-request';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export const AuthContext = createContext({
  isAuth: null,
  setIsAuth: () => {},
});

export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(null);
  const value = useMemo(() => ({ isAuth, setIsAuth }), [isAuth]);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    (async function checkLoginSession() {
      const endpoint = '/graph';
      const graphQLClient = new GraphQLClient(endpoint, {
        headers: {},
        credentials: 'include',
        mode: 'cors',
      });

      const query = gql`
        query PROFILE {
          profile {
            firstname
            lastname
          }
        }
      `;
      try {
        await graphQLClient.request(query);
        setIsAuth(true);
        navigate('/bird-watcher');
      } catch (error) {
        const { response } = JSON.parse(JSON.stringify(error));
        // eslint-disable-next-line no-console
        console.error(response.errors[0].message);
        setIsAuth(false);
        navigate('/');
      }
    })();
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
