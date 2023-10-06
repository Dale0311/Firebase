import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import { authData } from "../contexts/AuthContext";
export async function loader({ request }) {
  const message = new URL(request.url).searchParams.get("message");
  const url = new URL(request.url).searchParams.get("redirectTo");
  return { message, url };
}

function SignIn() {
  const redirectTo = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { message, url } = useLoaderData();
  const { signIn } = authData();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = await signIn(user);
    if (err) {
      setError(err);
      return;
    }
    redirectTo(url);
  };

  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
            Welcome back
          </h1>

          <form
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
            onSubmit={(e) => handleSubmit(e)}
          >
            <p className="text-center text-lg font-medium">
              Sign in to your account
            </p>
            <div>
              {message && (
                <p className="text-center text-red-500 font-medium my-2">
                  {message}
                </p>
              )}
              <label htmlFor="email" className="sr-only">
                Email
              </label>

              <div className="relative">
                <input
                  type="email"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter email"
                  value={user.email}
                  name="email"
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>

              <div className="relative">
                <input
                  type="password"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter password"
                  value={user.password}
                  name="password"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>

            <button
              type="submit"
              className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-500 text-center">
            Create new account{" "}
            <Link to="/signup" className="text-gray-700 underline">
              Sign up
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
}

export default SignIn;
