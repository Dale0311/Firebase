import { collection } from "firebase/firestore";
import { db } from "../config/firebase";
const blogListRef = collection(db, "blogs");
export default blogListRef;
