import React from 'react'
import CoinSearch from '../components/CoinSearch'
import Trending from '../components/Trending';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { signUp, logOut } from '../utils/authSlice';
import { useDispatch } from 'react-redux';

const Home = ({coins}) => {

  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        // user is logged in, send the user's details to redux, store the current user in the state
        console.log(userAuth);
        dispatch(
          signUp({
            email: userAuth.email,
            uid: userAuth.uid
          })
        );
      } 
      else {
        dispatch(logOut());
      }
    });
  }, []);

  return (
    <div>
      <CoinSearch coins={coins}/>
      <Trending/>
    </div>
  )
}

export default Home;