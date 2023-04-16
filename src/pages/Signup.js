import React, { useState } from "react";
import { AiFillLock, AiOutlineMail } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { auth,db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signUp } from "../utils/authSlice";
import { setDoc,doc } from "firebase/firestore";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userAuth) => {
        console.log(userAuth);
        // store the user's information in the redux state
        dispatch(
          signUp({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
          })
        );
        setDoc(doc(db, 'users', userAuth.user.email), { //using firebase firestore to stoe the movies data in the array savedShows
          watchList: []
      })
        setEmail("");
        setPassword("");
        navigate("/");
      })
      .catch((e) => {
        console.log(e.message);
        setError(e.message);
      });
  };


  return (
    <div className="max-w-[400px] mx-auto min-h-[300px] h-screen px-4 py-20 mt-3">
      <h1 className="text-2xl font-bold">Sign Up</h1>
      {error && <p className='p-3 my-2 bg-red-400'>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="my-4">
          <label>Email</label>
          <div className="my-2 relative w-full">
            <input
              className="w-full pl-3 rounded-2xl shadow-xl p-2 bg-primary border border-input"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <AiOutlineMail className="absolute top-3 right-2 text-gray-400" />
          </div>
        </div>
        <div className="my-4">
          <label>Password</label>
          <div className="my-2 relative w-full">
            <input
              className="w-full pl-3 rounded-2xl shadow-xl p-2 bg-primary border border-input"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <AiFillLock className="absolute top-3 right-2 text-gray-400" />
          </div>
        </div>
        <button className="w-full my-2 bg-button p-3 rounded-2xl shadow-xl text-btnText font-bold">
          Sign Up
        </button>
      </form>
      <p className="my-4 text-center">
        Already Have an Account?{" "}
        <Link to="/login" className="text-accent">
          Log In
        </Link>
      </p>
    </div>
  );
};

export default Signup;
