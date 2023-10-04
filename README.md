# React + Firebase

notes: i = import, c = create

### Setting up

1. add project
2. @project terminal -> npm i firebase
3. create sdk, copy n paste

### Authentication - async

#### signing up

1. @firebase
   c: sign in method w emailnpass
2. @project config
   i: getAuth from "firebase/auth" <br>
   c: const auth = getAuth(app)
3. @sign up page/component
   i: auth from "../config/firebase"<br>
   i: createUserWithEmailAndPassword from "firebase/auth"
4. create a fn that runs whenever we submit the form
   @handleSubmit instantiate the createUserWithEmailAndPassword(auth, username, password)

#### signing up using Google

2. @project config
   i: GoogleAuthProvider from "firebase/auth"<br>
   c: const googleProvider = new GoogleAuthProvider()
3. @sign up page/component
   i: googleProvider from "../config/firebase"<br>
   i: signInWithPopup from "firebase/auth"
4. @handleSubmit instantiate the signInWithPopup(auth, googleProvider)

5. @logout page/component
   i: signOut from "firebase/auth"
   @handleLogout instantiate signOut(auth)

#### getting information from the current user

1. after sign in or sign up
2. auth.currentUser -> object that has the current user info

#### setting up authentication

1. create a authContext

# gonna learn first react router authentication be4 jumping back, peace out
