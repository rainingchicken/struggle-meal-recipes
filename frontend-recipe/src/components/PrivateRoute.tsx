// @desc  checks if userInfo exists before navigating to protected routes such as dashboard and profile
//if user isn't signed in then redirect to login page

import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const { userInfo } = useSelector((state: any) => state.auth);
  return <>{userInfo ? <Outlet /> : <Navigate to="/login" replace />}</>;
};

export default PrivateRoute;
