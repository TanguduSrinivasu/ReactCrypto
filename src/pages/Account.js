import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { logOut } from "../utils/authSlice";
import { auth } from "../firebase";
import SavedCoin from "../components/SavedCoin";

const Account = () => {

  const user = useSelector(store => store.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //console.log(user);

  const handleLogOut = () => {
    dispatch(logOut());
    // sign out function from firebase
    auth.signOut();
    navigate('/')
  }


  if(user) {
    return (
      <div className="max-w-[1140px] mx-auto m-3">
        <div className="flex justify-between items-center my-3 rounded-div">
          <div>
            <h1 className="text-2xl font-bold">Account</h1>
            <div>
              <p>Welcome, {user?.email}</p>
            </div>
          </div>
          {user?.email && (<div>
            <button className="bg-button text-btnText px-5 py-2 rounded-2xl shadow-lg font-bold md:hidden" onClick={handleLogOut}>Sign Out</button>
          </div>)}
        </div>
  
        <div className="rounded-div">
          <div className="w-full">
            <h1 className="text-2xl font-bold">Watch List</h1>
            <SavedCoin />
          </div>
        </div>
      </div>
    );
  }
  else {
    return <Navigate to='/' />
  }


};

export default Account;
