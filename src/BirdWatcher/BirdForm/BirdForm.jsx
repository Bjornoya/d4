import { memo } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Form, InputNumber, Button } from 'antd';

function BirdForm({ onFinish }) {
  const [form] = Form.useForm();

  const submitForm = (values) => {
    onFinish(values.birds);
    form.resetFields();
  };

  return (
    <StyledForm
      labelCol={{ span: 24 }}
      form={form}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={submitForm}
      autoComplete="off"
    >
      <Form.Item
        label="Birds"
        name="birds"
        rules={[
          {
            required: true,
            message: 'Please input the number of birds!',
          },
        ]}
      >
        <StyledInput />
      </Form.Item>

      <Form.Item>
        <StyledButton type="primary" htmlType="submit">
          Send
        </StyledButton>
      </Form.Item>
    </StyledForm>
  );
}

const StyledForm = styled(Form)`
  @media only screen and (max-width: 1200px) {
    width: 100%;
  }
`;

const StyledInput = styled(InputNumber)`
  width: 300px;
  @media only screen and (max-width: 1200px) {
    width: 100%;
  }
`;

const StyledButton = styled(Button)`
  @media only screen and (max-width: 1200px) {
    width: 100%;
  }
`;

BirdForm.propTypes = {
  onFinish: PropTypes.func.isRequired,
};

export default memo(BirdForm);
