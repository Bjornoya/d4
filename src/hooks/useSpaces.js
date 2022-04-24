import { useState } from 'react';
import { gql, GraphQLClient } from 'graphql-request';
import { notification } from 'antd';

function useSpaces(
  params = `where: {}, paginate: { first: 20 }, sort: { field: "id", order: ASC }`
) {
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(false);

  const getSpaces = async (values) => {
    const endpoint = '/graph';
    const graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        'x-tenant-id': process.env.REACT_APP_TENANT_ID,
        'x-tenant-key': process.env.REACT_APP_TENANT_KEY,
      },
      credentials: 'include',
      mode: 'cors',
    });

    const query = gql`
      query SPACES {
        spaces(${params}) {
          nodes {
            name
            normalizedName
            createdAt
            updatedAt
            id
          }
        }
      }
    `;
    try {
      setLoading(true);
      const { spaces: data } = await graphQLClient.request(query, values);
      setSpaces(data.nodes);
    } catch (error) {
      const { response } = JSON.parse(JSON.stringify(error));
      notification.error({ message: response.errors[0].message, key: 'getSpacesError' });
    } finally {
      setLoading(false);
    }
  };

  return {
    spaces,
    loading,
    getSpaces,
  };
}

export default useSpaces;
