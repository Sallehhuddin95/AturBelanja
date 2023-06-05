import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hook";

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { loginUser } = useAppSelector((state: any) => state.user);
  const { isLoggedIn } = loginUser;
  return isLoggedIn ? <>{children}</> : <Navigate to="/login" replace={true} />;
};

export default ProtectedRoute;
