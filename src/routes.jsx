import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AppLayout from "./layout/AppLayout";
import "antd/dist/reset.css";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";

export const appRoutes = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <HomePage />, isProtected: true },
      { path: "/category", element: <CategoryPage />, isProtected: true },
    ],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
];
