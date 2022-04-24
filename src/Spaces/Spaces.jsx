import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { gql, GraphQLClient } from 'graphql-request';
import { notification } from 'antd';
import Layout from 'components/Layout';
import SpaceModal from './SpaceModal';
import SpaceCards from './SpaceCards';

function Spaces() {
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
        spaces(where: {}, paginate: { first: 20 }, sort: { field: "id", order: ASC }) {
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

  useEffect(() => {
    getSpaces();
  }, []);

  return (
    <Layout>
      <Header>
        <SpaceModal getSpaces={getSpaces} />
      </Header>
      <SpaceCards loading={loading} spaces={spaces} />
    </Layout>
  );
}

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
`;

export default Spaces;
