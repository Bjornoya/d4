import { useRef } from 'react';
import styled from 'styled-components';
import Dashboard from './Dashboard';
import BirdForm from './BirdForm/BirdForm';

function BirdWatcher() {
  const dashboardReference = useRef();

  const onFinish = (value) => {
    const dashboard = dashboardReference.current;
    const { data } = dashboard.data.datasets[0];
    data.splice(0, 0, value);
    dashboard.update();
  };

  return (
    <Container>
      <BirdForm onFinish={onFinish} />
      <DashboardWrapper>
        <Dashboard ref={dashboardReference} />
      </DashboardWrapper>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  padding: 0 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  @media only screen and (max-width: 1200px) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
`;

const DashboardWrapper = styled.div`
  width: 50%;
  @media only screen and (max-width: 1200px) {
    width: 100%;
  }
`;

export default BirdWatcher;
