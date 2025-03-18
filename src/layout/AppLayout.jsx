import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import NavBar from "../components/nav/NavBar"; // Your custom Navbar component
import "./AppLayout.css"; // Import the CSS for styling
import "antd/dist/reset.css"; // Ensure this is at the top of your main entry file

const { Header, Content, Footer, Sider } = Layout;

const AppLayout = ({ showNavbar = true, showSidebar = true }) => {
  return (
    <Layout>
      <Header className="app-header">
        <NavBar />
      </Header>

      <Layout>
        {/* Sidebar (Visible only when showSidebar is true) */}
        {/* {showSidebar && (
          <Sider className="app-sidebar" width={200}>
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["1"]}
              items={[
                { key: "1", label: "Dashboard" },
                { key: "2", label: "Profile" },
                { key: "3", label: "Settings" },
              ]}
            />
          </Sider>
        )} */}

        <Layout className="app-content">
          <Content className="content-area">
            <Outlet />
          </Content>
          <Footer className="app-footer">
            Ant Design ©{new Date().getFullYear()} Created by Shahbaz
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
