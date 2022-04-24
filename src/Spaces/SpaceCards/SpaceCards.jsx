import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Avatar, Card } from 'antd';
import PropTypes from 'prop-types';

const { Meta } = Card;

function SpaceCards({ spaces, loading }) {
  return (
    <Cards>
      {spaces?.map((space) => (
        <Card
          key={space.id}
          style={{ width: 300, marginTop: 16, marginRight: 16 }}
          loading={loading}
        >
          <NavLink to={`/spaces/${space.normalizedName}`}>
            <Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={space.name}
              description={`Created at: ${space.createdAt}`}
            />
          </NavLink>
        </Card>
      ))}
    </Cards>
  );
}

const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

SpaceCards.defaultProps = {
  spaces: [],
};

SpaceCards.propTypes = {
  spaces: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      normalizedName: PropTypes.string,
      name: PropTypes.string,
      createdAt: PropTypes.string,
    })
  ),
  loading: PropTypes.bool.isRequired,
};

export default SpaceCards;
