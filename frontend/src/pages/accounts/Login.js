import React, { useEffect, useState } from "react";
import Axios from "axios";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Card, Form, Input, Button, notification } from "antd";
import useLocalStorage from "utils/useLocalStorage";
import { useAppContext } from "store";
import { setToken } from "store";

export default function Login() {
  const { dispatch } = useAppContext();
  const navigate = useNavigate();
  // const [jwtToken, setJwtToken] = useLocalStorage("jwtToken", "");
  const [fieldErrors, setFieldErrors] = useState({});
  const onFinish = (values) => {
    async function fn() {
      const { username, password } = values;
      setFieldErrors({});
      const data = { username, password };
      try {
        const response = await Axios.post(
          "http://localhost:8000/accounts/token/",
          data
        );
        const {
          data: { access: jwtToken },
        } = response;
        dispatch(setToken(jwtToken));
        // setJwtToken(jwtToken);
        notification.open({
          message: "로그인 성공",
          description: "로그인 페이지로 이동합니다",
          icon: <SmileOutlined style={{ color: "#108ee9" }} />,
        });
        // navigate("/accounts/login");
      } catch (error) {
        if (error.response) {
          notification.open({
            message: "로그인 실패",
            description: "아이디 암호를 확인해주세요",
            icon: <FrownOutlined style={{ color: "#ff3333" }} />,
          });
          const { data: fieldsErrorMesaages } = error.response;
          setFieldErrors(
            Object.entries(fieldsErrorMesaages).reduce(
              (acc, [fieldName, errors]) => {
                acc[fieldName] = {
                  ValidateState: "error",
                  help: errors.join(" "),
                };
                return acc;
              },
              {}
            )
          );
        }
      }
    }
    fn();
  };
  return (
    <Card title="로그인">
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            { required: true, message: "Please input your username!" },
            { min: 5, message: "최소 5글자 입력해주세요" },
          ]}
          hasFeedback
          {...fieldErrors.username}
          {...fieldErrors.non_field_errors}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
          {...fieldErrors.username}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
