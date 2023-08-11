import { Button, Checkbox, Form, Input, message } from "antd";
import Api from "../../Api/Api";
import Loader from "../UI-Component/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
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

const CreateForm = () => {
  const api = new Api();
  const isLoad = useSelector((state) => state.isLoad);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [err, setErr] = useState({ username: "", email: "" });
  const onFinish = (values) => {
    dispatch({ type: "LOAD_CHANGE", payload: true });
    api.createUser(values).then((res) => {
      if (res.errors) {
        setErr(res.errors);
        dispatch({ type: "LOAD_CHANGE", payload: false });
      } else {
        setErr(false);
        dispatch({ type: "ADD_USER", payload: res.user });
        dispatch({ type: "LOG_IN" });
        dispatch({ type: "LOAD_CHANGE", payload: false });
        navigate("/");
      }
    });
  };
  return isLoad ? (
    <Loader />
  ) : (
    <Form
      {...formItemLayout}
      className="login-form"
      form={form}
      name="register"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
      scrollToFirstError
    >
      <h1 className="sign-in_title">Create new account</h1>
      Username
      <Form.Item
        name="username"
        tooltip="What do you want others to call you?"
        rules={[
          {
            required: true,
            message: "Please input your nickname!",
            whitespace: true,
          },
          {
            required: true,
            message: "Your username must to be within 3 to 20 characters.",
            whitespace: true,
            min: 3,
            max: 20,
          },
        ]}
        style={{ width: 590 }}
      >
        <Input
          style={err.username ? { borderColor: "red" } : null}
          onChange={() => setErr(false)}
        />
      </Form.Item>
      {err.username ? (
        <div style={{ color: "red", position: "absolute", top: 270 }}>
          {"username is alredy taken"}
        </div>
      ) : null}
      Email address
      <Form.Item
        name="email"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
        style={{ width: 590 }}
      >
        <Input
          style={err.email ? { borderColor: "red" } : null}
          onChange={() => setErr(false)}
        />
      </Form.Item>
      {err.email ? (
        <div style={{ color: "red", position: "absolute", top: 350 }}>
          {"email is alredy taken"}
        </div>
      ) : null}
      Password
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
          {
            required: true,
            message: "Your password must to be within 6 to 40 characters.",
            whitespace: true,
            min: 6,
            max: 40,
          },
        ]}
        style={{ width: 590 }}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>
      Repeat Password
      <Form.Item
        name="confirm"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The new password that you entered do not match!"),
              );
            },
          }),
        ]}
        style={{ width: 590 }}
      >
        <Input.Password />
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
      >
        <Checkbox>I have read the agreement</Checkbox>
      </Form.Item>
      <Form.Item>
        <div className="sign-in_buttons">
          <Button type="primary" htmlType="submit" style={{ marginLeft: 60 }}>
            Register
          </Button>
          Or <Link to="/sign-in">sign in now!</Link>
        </div>
      </Form.Item>
    </Form>
  );
};
export default CreateForm;
