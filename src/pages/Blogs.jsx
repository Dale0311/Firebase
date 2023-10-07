import { useActionData, useLoaderData, redirect } from "react-router-dom";
import { db } from "../config/firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import BlogsCard from "../components/BlogCard";
import Modal from "../components/Modal";
import { useState } from "react";
import blogListRef from "../utils/blogListRef";

// read
export async function loader() {
  const data = await getDocs(blogListRef);
  const blogs = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return blogs;
}

// write
export async function action({ request }) {
  const data = await request.formData();

  // inputs for create
  const title = data.get("title");
  const body = data.get("body");

  // create
  async function create() {
    // validation
    if (!title || title === " " || !body || body === " ") {
      return "All fields are required";
    }
    await addDoc(blogListRef, { title, body, views: 0 });
    return redirect("/");
  }

  // delete
  async function remove() {
    // input for delete
    const id = data.get("toDeleteBlog");
    console.log(id);
    const deleteBlogRef = doc(db, "blogs", id);
    try {
      await deleteDoc(deleteBlogRef);
      return null;
    } catch (e) {
      return e;
    }
  }
  if (request.method === "POST") {
    await create();
  } else if (request.method === "DELETE") {
    await remove();
  }

  return null;
}

function Blogs() {
  const [showModal, setShowModal] = useState(false);
  // maye add a key of how many views blog currently has
  const blogs = useLoaderData();
  const errUserInput = useActionData();
  const renderedBlogs = blogs.map((blog) => {
    return (
      <BlogsCard
        key={blog.id}
        id={blog.id}
        title={blog.title}
        views={blog.views}
      />
    );
  });
  return (
    <div className="container mx-auto lg:w-1/2">
      <div className="grid grid-cols-3 gap-4">{renderedBlogs}</div>
      <div className="flex justify-end my-4">
        <button
          className="relative inline-block group text-right"
          onClick={() => setShowModal(true)}
        >
          <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-[#2563EB] transition-colors duration-300 ease-out border-2 border-[#2563EB] rounded-lg group-hover:text-white">
            <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
            <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-[#2563EB] group-hover:-rotate-180 ease"></span>
            <span className="relative">Add Blog</span>
          </span>
          <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-[#2585eb] rounded-lg group-hover:mb-0 group-hover:mr-0"></span>
        </button>
      </div>
      {showModal && (
        <Modal setShowModal={setShowModal} errUserInput={errUserInput} />
      )}
    </div>
  );
}

export default Blogs;
