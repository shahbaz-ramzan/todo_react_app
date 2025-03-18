import { Routes, Route } from "react-router-dom";
import { appRoutes } from "./routes";
import AuthGuard from "./components/wrapper/AuthGuard";
import "antd/dist/reset.css";

export default function App() {
  return (
    <Routes>
      {appRoutes?.map(({ path, element, children }) => (
        <Route key={path} path={path} element={element}>
          {children?.map(({ path, element, isProtected }) => (
            <Route
              key={path}
              path={path}
              element={isProtected ? <AuthGuard>{element}</AuthGuard> : element}
            />
          ))}
        </Route>
      ))}
    </Routes>
  );
}
