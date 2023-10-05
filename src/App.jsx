import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

// pages
import Layout from "./components/Layout";
import Home from "./pages/Home";
import SignUp, { loader as loginLoader } from "./pages/SignUp";
import Profile from "./pages/Profile";
import ProtectedRoute, {
  loader as protectedLoader
} from "./components/ProtectedRoute";
// Context
import AuthContext from "./contexts/AuthContext";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="blogs" element={<h1>Hello from Blogs</h1>} />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
          loader={protectedLoader}
        />
        <Route path="signup" element={<SignUp />} loader={loginLoader} />
      </Route>
    )
  );

  return (
    <AuthContext>
      <RouterProvider router={router} />;
    </AuthContext>
  );
}

export default App;
