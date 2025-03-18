import { Navigate } from "react-router-dom";
import { getToken } from "../../utils/generalUtility";

const AuthGuard = ({ children }) => {
  const isUserAuthenticated = !!getToken();
  return isUserAuthenticated ? children : <Navigate to="/login" replace />;
};

export default AuthGuard;
