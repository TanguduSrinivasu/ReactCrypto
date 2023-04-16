import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import { useSelector } from "react-redux";
import ThemeToggle from "./ThemeToggle";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../utils/authSlice";
import { auth } from "../firebase";

const NavBar = () => {
  //const theme = useSelector((store) => store.theme.theme);
  const user = useSelector((store) => store.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [sideMenu, setSideMenu] = useState(false);

  const sideMenuHandler = () => {
    setSideMenu(!sideMenu);
  }

  const handleLogOut = () => {
    dispatch(logOut());
    // sign out function from firebase
    auth.signOut();
    navigate('/')
  }


  return (
    <div className="rounded-div flex items-center justify-between mt-3 h-20 font-bold">
      <Link to="/">
        <h1 className="text-2xl">CryptoBase</h1>
      </Link>
      <div className="hidden md:block">
        <ThemeToggle />
      </div>
      {user?.email ? (<div>
          <Link to='/account' className='p-4 hidden md:inline'>
            Account
          </Link>
          <button onClick={handleLogOut} className="hidden md:inline bg-button text-btnText px-5 py-2 rounded-2xl shadow-lg">Sign out</button>
        </div>) : (
          <div className="hidden md:block">
        <Link to="/login" className="p-4 hover:text-accent mr-2">
          Log In
        </Link>
        <Link
          to="/signup"
          className="bg-button text-btnText px-5 py-2 rounded-2xl shadow-lg"
        >
          Sign Up
        </Link>
      </div>
        )}
      

      {/* Menu Icon for Mobile */}
      <div className="block md:hidden cursor-pointer" onClick={sideMenuHandler}>
        {sideMenu ? <AiOutlineClose size={21}/> : <AiOutlineMenu size={21}/>}
      </div>
      {/* Mobile Menu List */}
      {/* <div className="md:hidden fixed left-0 top-[13.5%] flex flex-col items-center justify-between w-full h-[85.5%] bg-primary border border-secondary rounded-2xl shadow-2xl"> */}
      <div className={sideMenu ? 'md:hidden fixed left-0 top-[13.5%] flex flex-col items-center justify-between w-full h-[85.5%] bg-primary duration-1000 z-10 border border-secondary rounded-2xl shadow-2xl'
            : 'fixed left-[-100%] top-[13.5%] h-[85.5%] flex flex-col items-center justify-between bg-primary border border-secondary rounded-2xl shadow-2xl duration-1000 w-full z-10'
    }>
        <ul className="w-full p-4 text-center">
          <li className="border-b py-6">
            <Link to="/" onClick={sideMenuHandler}>Home</Link>
          </li>
          <li className="border-b py-6">
            <Link to="/account" onClick={sideMenuHandler}>Account</Link>
          </li>
          <li className="py-6 flex justify-center">
            <ThemeToggle />
          </li>
        </ul>

      {user?.email ? (
          <div className="flex items-center w-full px-3 py-2">
            <Link className="w-full" onClick={handleLogOut}>
            <button className="w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl">Sign Out</button>
          </Link>
          </div>
      ) : (
        <div className="flex flex-col w-full px-3 py-2">
          <Link to="/login">
            <button className="w-full my-2 p-3 bg-primary text-primary border border-secondary rounded-2xl shadow-xl" onClick={sideMenuHandler}>Log In</button>
          </Link>
          <Link to="/signup">
            <button className="w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl" onClick={sideMenuHandler}>Sign Up</button>
          </Link>
        </div>
      )}
     
      </div>
    </div>
  );
};

export default NavBar;
