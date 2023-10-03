import { NavLink, Outlet } from "react-router-dom";
import logo from "../assets/images/logo.png";
function Layout() {
  return (
    <>
      <div>
        <div className="sm:hidden">
          <label for="Tab" className="sr-only">
            Tab
          </label>

          <select id="Tab" className="w-full rounded-md border-gray-200">
            <option>Settings</option>
            <option>Messages</option>
            <option>Archive</option>
            <option select>Notifications</option>
          </select>
        </div>

        <div className="hidden container my-5 mx-auto sm:flex sm:justify-between sm:items-center">
          <img src={logo} alt="" />
          <nav className="flex-1 flex gap-6 justify-end" aria-label="Tabs">
            <NavLink
              to={"#"}
              className="shrink-0 rounded-lg p-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            >
              Settings
            </NavLink>

            <NavLink
              to={"#"}
              className="shrink-0 rounded-lg p-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            >
              Messages
            </NavLink>

            <NavLink
              to={"#"}
              className="shrink-0 rounded-lg p-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            >
              Archive
            </NavLink>

            <NavLink
              to={"#"}
              className="shrink-0 rounded-lg bg-sky-100 p-2 text-sm font-medium text-sky-600"
              aria-current="page"
            >
              Notifications
            </NavLink>
          </nav>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Layout;
