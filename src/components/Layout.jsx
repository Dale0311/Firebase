import { NavLink, Outlet, Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
function Layout() {
  return (
    <>
      <div>
        <div className="hidden container my-5 mx-auto sm:flex sm:justify-between sm:items-center">
          <Link to={"/"}>
            <img src={logo} />
          </Link>
          <nav className="flex-1 flex gap-6 justify-end" aria-label="Tabs">
            <NavLink
              to={"blogs"}
              className="shrink-0 rounded-lg p-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            >
              Blogs
            </NavLink>

            <NavLink
              to={"profile"}
              className="shrink-0 rounded-lg p-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            >
              Profile
            </NavLink>

            <NavLink
              to={"login"}
              className="shrink-0 rounded-lg p-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              onClick={() => localStorage.clear()}
            >
              Login
            </NavLink>
          </nav>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Layout;
