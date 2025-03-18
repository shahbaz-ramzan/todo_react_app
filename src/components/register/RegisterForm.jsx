import { Form, Input, Button, Typography, Card } from "antd";
import { Link } from "react-router-dom";
import User from "../../services/api_servises/user";
import "antd/dist/reset.css";
import "./Register.css";


const { Text } = Typography;
const RegisterForm = () => {
  const register = async (payload) => {
    const res = await User.registerUserCall(payload);
  };

  const onFinish = (values) => {
    const payload = {
      email: values.email,
      username: values.username,
      password: values.password,
      confirmPassword: values.confirmPassword,
    };
    register(payload);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="register-container">
      <Card title="Register Form" className="register-card">
        <Form
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="User Name"
            name="username"
            rules={[{ required: true, message: "Please enter userName!" }]}
          >
            <Input placeholder="Enter your userName" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Invalid email format!" },
            ]}
          >
            <Input placeholder="Enter Email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password placeholder="Enter Password" />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Passwords do not match!");
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Register
            </Button>
          </Form.Item>
        </Form>

        <div className="signin-text">
          <Text>
            Already have an account? <Link to="/login">Sign in</Link>.
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default RegisterForm;
