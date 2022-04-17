import { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

export const AuthContext = createContext({
  isAuth: false,
  setIsAuth: () => {},
});
export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const value = useMemo(() => ({ isAuth, setIsAuth }), [isAuth]);

  // TODO: `I've tried to persist the user's authentication between page refreshes, but for some reason, It didn't work.
  // Auth cookie is changing after page refresh. Also, I found 'accessToken' query in the docs, but probably It's related to'Tenants'.`

  /*
  useEffect(() => {
    (async function checkLoginSession() {
      const endpoint = 'https://iot.dimensionfour.io/graph';
      const graphQLClient = new GraphQLClient(endpoint, { headers: { credentials: 'include' } });

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
      } catch (error) {
        const { response } = JSON.parse(JSON.stringify(error));
        // eslint-disable-next-line no-console
        console.error(response.errors[0].message);
      }
    })();
  }, []);
  */

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
