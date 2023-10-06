import { authData } from "../contexts/AuthContext";
export function loader() {
  const { user } = authData();
  return user;
}
function Blogs() {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-3">
        <h1>Welcome to blogs page</h1>
      </div>
    </div>
  );
}

export default Blogs;
