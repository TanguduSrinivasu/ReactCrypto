import React, { useState } from "react";
import { AiFillLock, AiOutlineMail } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  //const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, password)
      .then((userAuth) => {
        console.log(userAuth);
        setEmail("");
        setPassword("");
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  };

  return (
    <div className="max-w-[400px] mx-auto min-h-[300px] h-screen px-4 py-20 mt-3">
      <h1 className="text-2xl font-bold">Log In</h1>
      {error ? <p className='p-3 bg-red-400 mt-5'>{error}</p> : null}
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
          Log In
        </button>
      </form>
      <p className="my-4 text-center">
        Don't Have an Account?{" "}
        <Link to="signup" className="text-accent">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;
