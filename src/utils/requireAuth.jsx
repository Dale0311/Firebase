import { redirect } from "react-router-dom";
function requireAuth(request) {
  const user = localStorage.getItem("user") || "";
  const url = new URL(request.url).pathname;
  if (!user) {
    return redirect(`/login?message=Login first&redirectTo=${url || "/"}`);
  }
  return null;
}

export default requireAuth;
