import { useLoaderData, useActionData, Form, redirect } from "react-router-dom";
import Alert from "../components/Alert";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
export async function loader({ request }) {
  return new URL(request.url).searchParams.get("message");
}

export async function action({ request }) {
  const to = new URL(request.url).searchParams.get("redirectTo") || "/";
  const data = await request.formData();
  const email = data.get("email");
  const password = data.get("password");
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    localStorage.setItem("user", {
      uid: auth.currentUser.uid,
      email: auth.currentUser.email,
    });
    redirect(to);
  } catch (err) {
    return err;
  }
  return null;
}
function Login() {
  const message = useLoaderData();
  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
            Get started today
          </h1>

          <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
            Join millions of users sharing their blogs daily
          </p>

          <Form
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
            method="post"
          >
            <p className="text-center text-lg font-medium">
              Sign up to your account
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
                  name="email"
                  placeholder="Enter email"
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
                  name="password"
                  placeholder="Enter password"
                />
              </div>
            </div>

            <button
              type="submit"
              className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
            >
              Sign Up
            </button>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Login;
