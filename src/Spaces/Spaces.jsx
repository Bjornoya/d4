import React, { useEffect } from 'react';
import styled from 'styled-components';
import useSpaces from 'hooks/useSpaces';
import Layout from 'components/Layout';
import SpaceModal from './SpaceModal';
import SpaceCards from './SpaceCards';

function Spaces() {
  const { spaces, loading, getSpaces } = useSpaces();

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
