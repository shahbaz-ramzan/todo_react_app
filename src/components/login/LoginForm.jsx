import { Form, Input, Button, Checkbox, Card, Typography, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";
import "./LoginForm.css"; // Import the CSS file
import { Link, useNavigate } from "react-router-dom";
import User from "../../services/api_servises/user";
const { Text } = Typography;

const LoginForm = () => {
  const navigate = useNavigate();
  const login = async (payload) => {
    const res = await User.loginCall(payload);

    if (res?.status == 200) {
      message.success(res?.data?.message || "Login successful!");
      navigate("/");
    }
  };

  const onFinish = (values) => {
    const payload = {
      email: values.email,
      password: values.password,
    };
    login(payload);
  };

  return (
    <div className="login-container">
      <Card title="Login Form" className="login-card">
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please enter your email!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a href="#">Forgot password?</a>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
        </Form>
        <div className="signin-text">
          <Text>
            Don&apos;t have an account? <Link to="/register">Sign up here</Link>
            .
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default LoginForm;
