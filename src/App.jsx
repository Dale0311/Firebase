import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

// pages
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login, {
  loader as loginLoader,
  action as loginAction,
} from "./pages/login";

// Auth
import requireAuth from "./utils/requireAuth";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route
          path="blogs"
          element={<h1>Hello from Blogs</h1>}
          loader={async ({ request }) => {
            return requireAuth(request);
          }}
        />
        <Route
          path="profile"
          element={<h1>Hello from Profile</h1>}
          loader={async ({ request }) => {
            return requireAuth(request);
          }}
        />
        <Route
          path="login"
          element={<Login />}
          loader={loginLoader}
          action={loginAction}
        />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
