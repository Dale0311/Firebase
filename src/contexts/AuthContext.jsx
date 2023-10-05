import { useContext, createContext, useState } from "react";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
const Context = createContext();
function AuthContext({ children }) {
  const [user, setUser] = useState(localStorage.getItem("user") || null);
  async function signUp(user) {
    const { email, password } = user;
    try {
      const data = await createUserWithEmailAndPassword(auth, email, password);
      const { email: currentUserEmail, uid } = data.user;
      const user = { email: currentUserEmail, id: uid };
      localStorage.setItem("user", user);
      setUser(user);
    } catch (err) {
      return err;
    }
  }
  const value = { user, signUp };
  return (
    <>
      <Context.Provider value={value}>{children}</Context.Provider>
    </>
  );
}

export function authData() {
  return useContext(Context);
}
export default AuthContext;
