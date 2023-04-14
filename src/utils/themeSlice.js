import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name : 'theme',
    initialState : {
        theme : null
    },

    reducers : {
        themeChange : (state, action) => {
            state.theme = action.payload;
        }
    }
})

export const {themeChange} = themeSlice.actions;
export default themeSlice.reducer;