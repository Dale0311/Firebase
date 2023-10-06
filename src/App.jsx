import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

// pages
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ProtectedRoute, {
  loader as protectedLoader,
} from "./components/ProtectedRoute";
import Blogs, { loader as blogsLoader } from "./pages/Blogs";
// auth component
import SignUp from "./pages/SignUp";
import SignIn, { loader as signInLoader } from "./pages/SignIn";

// Context
import AuthContext from "./contexts/AuthContext";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="blogs" element={<Blogs />} loader={blogsLoader} />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
          loader={protectedLoader}
        />
        <Route path="signup" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} loader={signInLoader} />
      </Route>
    )
  );

  return (
    <AuthContext>
      <RouterProvider router={router} />
    </AuthContext>
  );
}

export default App;
