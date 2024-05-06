import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Select, message } from "antd";
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
      
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export const Registr = () => {
  const [status, setStatus] = useState("");
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log(values, "valus");
    setStatus(values.agreement);
  };
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 90,
        }}
      >
        <Option value="998">+998</Option>
        <Option value="7">+7</Option>
      </Select>
    </Form.Item>
  );

  const [messageApi, contextHolder] = message.useMessage();
  const key = "updatable";
  const openMessage = () => {
    messageApi.open({
      key,
      type: "loading",
      content: "Loading...",
    });
    setTimeout(() => {
      messageApi.open({
        key,
        type: "success",
        content: "Xaridingiz uchun raxmat!",
        duration: 2,
      });
    }, 2000);
  };
  const warning = () => {
    messageApi.open({
      type: "warning",
      content: "Malumotingizni kiriting",
    });
  };
  return (
    <div className="flex w-full  h-screen   justify-center  items-center">
      <Form
        {...formItemLayout}
        className="mx-auto"
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          residence: ["zhejiang", "hangzhou", "xihu"],
          prefix: "+998",
        }}
        style={{
          maxWidth: 600,
        }}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "Email kiriting!",
            },
            {
              required: true,
              message: "Email kiriting!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="nickname"
          label="Ismingizni kiriting"
          tooltip="Ismingizni kiriting"
          rules={[
            {
              required: true,
              message: "Ismingizni kiriting",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Telefon raqam kiriting"
          rules={[
            {
              required: true,
              message: "Telefon raqam kiriting",
            },
          ]}
        >
          <Input
            addonBefore={prefixSelector}
            style={{
              width: "100%",
            }}
          />
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("Should accept agreement")),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            I have read the <a href="">agreement</a>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          {contextHolder}
          <Button
            onClick={() => {
              status === true ? openMessage() : warning();
            }}
            type="primary"
            htmlType="submit"
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
