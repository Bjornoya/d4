import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, notification } from 'antd';
import { gql, GraphQLClient } from 'graphql-request';
import PropTypes from 'prop-types';

function PointsModal({ getSpaces, spaceId }) {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    if (spaceId) {
      form.setFieldsValue({ spaceId });
    }
  }, [spaceId]);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onFinish = async (values) => {
    const endpoint = '/graph';
    const graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        'x-tenant-id': process.env.REACT_APP_TENANT_ID,
        'x-tenant-key': process.env.REACT_APP_TENANT_KEY,
      },
      credentials: 'include',
      mode: 'cors',
    });

    const mutation = gql`
      mutation CREATE_POINT($name: String!, $spaceId: ID!) {
        point {
          create(input: { name: $name, spaceId: $spaceId }) {
            id
          }
        }
      }
    `;
    try {
      setConfirmLoading(true);
      await graphQLClient.request(mutation, values);
      setVisible(false);
      getSpaces();
      notification.success({
        message: 'Point has been successfully created!',
        key: 'createPointSuccess',
      });
    } catch (error) {
      const { response } = JSON.parse(JSON.stringify(error));
      notification.error({ message: response.errors[0].message, key: 'createPointError' });
    } finally {
      setConfirmLoading(false);
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Create Point
      </Button>
      <Modal
        title="Create Point"
        visible={visible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancelBtn" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submitBtn"
            form="point"
            htmlType="submit"
            type="primary"
            loading={confirmLoading}
          >
            Submit
          </Button>,
        ]}
      >
        <Form
          form={form}
          name="point"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          onFinish={(values) => onFinish(values)}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input point's name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Space ID"
            name="spaceId"
            rules={[{ required: true, message: 'Please input space id!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

PointsModal.propTypes = {
  getSpaces: PropTypes.func.isRequired,
  spaceId: PropTypes.string.isRequired,
};

export default PointsModal;
