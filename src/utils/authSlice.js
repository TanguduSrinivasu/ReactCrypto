import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null
  },

  reducers: {

    signUp: (state, action) => {
      state.user = action.payload;
    //   setDoc(doc(db, 'users', state.user.email), { //using firebase firestore to store the movies data in the array savedShows
    //     savedShows: []
    // })
    },
    logOut: (state) => {
      state.user = null;
    },
  },

});

export const {  signUp, logOut } = authSlice.actions;
export default authSlice.reducer;
