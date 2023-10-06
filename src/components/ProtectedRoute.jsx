import { useLoaderData, Navigate } from "react-router-dom";
import { authData } from "../contexts/AuthContext";
import requireAuth from "../utils/requireAuth";

export function loader({ request }) {
  return new URL(request.url).pathname;
}
function ProtectedRoute({ children }) {
  const { user } = authData();
  const url = useLoaderData();
  const isLoggedIn = requireAuth(user);
  return (
    <div>
      {!isLoggedIn ? (
        <Navigate to={"/signin?message=Sign in first&redirectTo=" + url} />
      ) : (
        children
      )}
    </div>
  );
}

export default ProtectedRoute;
