import { useContext, createContext, useState } from "react";
import { auth } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  AuthErrorCodes,
  signInWithEmailAndPassword,
} from "firebase/auth";
const Context = createContext();
function AuthContext({ children }) {
  const [user, setUser] = useState(localStorage.getItem("user") || null);
  const [error, setError] = useState({
    signInError: "",
    signUpError: "",
  });
  // const [error, setError] = useState("");
  async function signUp(user) {
    const { email, password } = user;
    try {
      const data = await createUserWithEmailAndPassword(auth, email, password);
      const { email: currentUserEmail, uid } = data.user;
      const user = { email: currentUserEmail, id: uid };
      localStorage.setItem("user", user);
      setUser(user);
    } catch (err) {
      if (err.code === AuthErrorCodes.WEAK_PASSWORD) {
        setError((error) => ({
          ...error,
          signUpError: "The password that you provided is weak",
        }));
      } else if (err.code === AuthErrorCodes.EMAIL_EXISTS) {
        setError((error) => ({
          ...error,
          signUpError: "The email is already taken",
        }));
      } else if (err.code === AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER) {
        setError((error) => ({
          ...error,
          signUpError: "Too many attemps, try again later",
        }));
      } else {
        setError((error) => ({
          ...error,
          signUpError: err.code,
        }));
      }
    } finally {
      return error.signUpError;
    }
  }
  async function signIn(user) {
    const { email, password } = user;
    try {
      const data = await signInWithEmailAndPassword(auth, email, password);
      const { email: currentUserEmail, uid } = data.user;
      const user = { email: currentUserEmail, id: uid };

      // if there's an existing user
      if (localStorage.getItem("user")) {
        localStorage.removeItem("user");
      }

      localStorage.setItem("user", user);
      setUser(user);
    } catch (err) {
      if (err.code === AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER) {
        setError((error) => ({
          ...error,
          signInError: "Too many attempts, try again later",
        }));
      } else {
        setError((error) => ({
          ...error,
          signInError: "Invalid email or password",
        }));
      }
    } finally {
      return error.signInError;
    }
  }
  const value = { user, signUp, signIn };
  return (
    <>
      <Context.Provider value={value}>{children}</Context.Provider>
    </>
  );
}

// two ways to refactor error
// 1. with state

// returning the state
// function AuthContext({ children }) {
//   const [user, setUser] = useState(localStorage.getItem("user") || null);
//   const [error, setError] = useState({
//     signUpError: "",
//     signInError: "",
//   });
//   async function signUp(user) {
//     const { email, password } = user;
//     try {
//       const data = await createUserWithEmailAndPassword(auth, email, password);
//       const { email: currentUserEmail, uid } = data.user;
//       const user = { email: currentUserEmail, id: uid };
//       localStorage.setItem("user", user);
//       setUser(user);
//     } catch (err) {
//       if (err.code === AuthErrorCodes.WEAK_PASSWORD) {
//         setError((err) => ({
//           ...err,
//           signUpError: "The password that you provided is weak",
//         }));
//       } else if (err.code === AuthErrorCodes.EMAIL_EXISTS) {
//         setError((err) => ({
//           ...err,
//           signUpError: "The email is already taken",
//         }));
//       } else {
//         setError((err) => ({
//           ...err,
//           signUpError: err.code,
//         }));
//       }
//     }
//   }
//   async function signIn(user) {
//     const { email, password } = user;
//     try {
//       const data = await signInWithEmailAndPassword(auth, email, password);
//       const { email: currentUserEmail, uid } = data.user;
//       const user = { email: currentUserEmail, id: uid };

//       // if there's an existing user
//       if (localStorage.getItem("user")) {
//         localStorage.removeItem("user");
//       }

//       localStorage.setItem("user", user);
//       setUser(user);
//     } catch (err) {
//       setError((err) => ({
//         ...err,
//         signInError: "Invalid email or password",
//       }));
//     }
//   }
//   const value = { user, signUp, error, signIn };
//   return (
//     <>
//       <Context.Provider value={value}>{children}</Context.Provider>
//     </>
//   );
// }

export function authData() {
  return useContext(Context);
}
export default AuthContext;
