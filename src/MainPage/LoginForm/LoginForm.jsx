import { useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { GraphQLClient, gql } from 'graphql-request';
import { Form, Button, Input, notification } from 'antd';
import { AuthContext } from 'AuthContext';

function LoginForm() {
  const { setIsAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  async function onFinish(values) {
    const endpoint = 'https://iot.dimensionfour.io/graph';
    const graphQLClient = new GraphQLClient(endpoint, { headers: { credentials: 'include' } });

    const mutation = gql`
      mutation LOG_IN($email: String!, $password: String!) {
        account {
          login(input: { service: PASSWORD, params: { email: $email, password: $password } }) {
            id
          }
        }
      }
    `;
    try {
      await graphQLClient.request(mutation, values);
      setIsAuth(true);
      navigate('/bird-watcher');
    } catch (error) {
      const { response } = JSON.parse(JSON.stringify(error));
      notification.error({ message: response.errors[0].message, key: 'loginError' });
    }
  }

  return (
    <Container>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={(values) => onFinish(values)}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ xs: { span: 0, offset: 0 }, sm: { offset: 8, span: 16 } }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  width: 400px;
  padding: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  @media only screen and (max-width: 575px) {
    width: 100%;
  }
`;

export default LoginForm;
