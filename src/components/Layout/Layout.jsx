import React from 'react';
import PropTypes from 'prop-types';
import { Layout as AntLayout, Menu } from 'antd';
import { NavLink } from 'react-router-dom';

const { Header, Content, Footer } = AntLayout;

function Layout({ children }) {
  return (
    <AntLayout style={{ height: '100vh' }}>
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['home']}>
          <Menu.Item key="home">
            <NavLink to="/bird-watcher">Home</NavLink>
          </Menu.Item>
          <Menu.Item key="spaces">
            <NavLink to="/spaces">Spaces</NavLink>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '50px' }}>
        <div className="site-layout-content">{children}</div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        D4 Demo App ©2022 Created by Gleb Ambrazhevich
      </Footer>
    </AntLayout>
  );
}

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default Layout;
