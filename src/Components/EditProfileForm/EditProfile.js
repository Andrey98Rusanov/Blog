import { Button, Form, Input } from "antd";
import Api from "../../Api/Api";
import Loader from "../UI-Component/Loader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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

const EditProfileForm = () => {
  const api = new Api();
  const currentUser = useSelector((state) => state.currentUser);
  const isLoad = useSelector((state) => state.isLoad);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const onFinish = (values) => {
    dispatch({ type: "LOAD_CHANGE", payload: true });
    api.editUserAccount(values).then((res) => {
      dispatch({ type: "ADD_USER", payload: res.user });
      dispatch({ type: "LOAD_CHANGE", payload: false });
      navigate("/");
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
      initialValues={{
        username: currentUser.username,
        email: currentUser.email,
      }}
      style={{
        maxWidth: 600,
      }}
      scrollToFirstError
    >
      <h1 className="sign-in_title">Edit profile</h1>
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
        <Input />
      </Form.Item>
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
        <Input />
      </Form.Item>
      New password
      <Form.Item
        name="password"
        rules={[
          {
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
      Avatar image (url)
      <Form.Item name="image" hasFeedback style={{ width: 590 }}>
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};
export default EditProfileForm;
