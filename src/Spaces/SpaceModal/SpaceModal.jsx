import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, notification } from 'antd';
import { gql, GraphQLClient } from 'graphql-request';
import PropTypes from 'prop-types';

function SpaceModal({ getSpaces, parentId }) {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    if (parentId) {
      form.setFieldsValue({ parentId });
    }
  }, [parentId]);

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
      mutation CREATE_SPACE($name: String!, $parentId: ID) {
        space {
          create(input: { name: $name, parentId: $parentId }) {
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
        message: 'Space has been successfully created!',
        key: 'createSpaceSuccess',
      });
    } catch (error) {
      const { response } = JSON.parse(JSON.stringify(error));
      notification.error({ message: response.errors[0].message, key: 'createSpaceError' });
    } finally {
      setConfirmLoading(false);
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Create Space
      </Button>
      <Modal
        title="Create Space"
        visible={visible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancelBtn" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submitBtn"
            form="space"
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
          name="space"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          onFinish={(values) => onFinish(values)}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input space's name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Parent ID" name="parentId">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

SpaceModal.defaultProps = {
  parentId: '',
};

SpaceModal.propTypes = {
  getSpaces: PropTypes.func.isRequired,
  parentId: PropTypes.string,
};

export default SpaceModal;
