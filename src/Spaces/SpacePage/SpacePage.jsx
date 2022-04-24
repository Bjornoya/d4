import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { gql } from 'graphql-request';
import styled from 'styled-components';
import { Divider } from 'antd';
import useSpaces from 'hooks/useSpaces';
import Layout from 'components/Layout';
import SpaceModal from '../SpaceModal';
import PointsModal from '../PointsModal';
import SpaceCards from '../SpaceCards';

const query = (filters) => gql`
  query SPACES {
    spaces(${filters}) {
      nodes {
        id
        points(where: {}, paginate: { first: 20 }, sort: { field: "id", order: ASC }) {
          nodes {
            id,
            name,
            createdAt,
            updatedAt
          }
        }
        children {
          nodes {
            name
            normalizedName
            createdAt
            updatedAt
            id
        }
      }
    }
  }  
  }
`;

function SpacePage() {
  const path = useParams();
  const filters = `where: { normalizedName: { _EQ: "${path.name}" } }, paginate: { first: 20 }, sort: { field: "id", order: ASC }`;
  const { spaces, loading, getSpaces } = useSpaces(query(filters));
  const spaceId = spaces[0]?.id || '';
  const childSpaces = spaces[0]?.children?.nodes;
  const points = spaces[0]?.points?.nodes;

  useEffect(() => {
    getSpaces();
  }, []);

  return (
    <Layout>
      <Header>
        <Headline>Spaces</Headline>
        <SpaceModal getSpaces={getSpaces} parentId={spaceId} />
      </Header>
      <SpaceCards spaces={childSpaces} loading={loading} />
      <Divider />
      <Header>
        <Headline>Points</Headline>
        <PointsModal getSpaces={getSpaces} spaceId={spaceId} />
      </Header>
      <SpaceCards spaces={points} loading={loading} />
    </Layout>
  );
}

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const Headline = styled.h3`
  margin: 0;
`;

export default SpacePage;
