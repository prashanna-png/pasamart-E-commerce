import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux"; // or your auth source

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  if (!userInfo) {
    // Not logged in → go to login
    return <Navigate to="/login" replace />;
  }

  if (!userInfo.isAdmin) {
    // Logged in but not admin → go to home or a "not authorized" page
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;