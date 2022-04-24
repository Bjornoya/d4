import React, { useEffect } from 'react';
import styled from 'styled-components';
import { gql } from 'graphql-request';
import useSpaces from 'hooks/useSpaces';
import Layout from 'components/Layout';
import SpaceModal from './SpaceModal';
import SpaceCards from './SpaceCards';

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

function Spaces() {
  const { spaces, loading, getSpaces } = useSpaces(query);

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
