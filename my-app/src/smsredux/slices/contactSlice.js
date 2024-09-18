import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
}

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    
    sendcontactid: (state, action) => {
    //   console.log("group entered"); 
    //   console.log(action.payload); 
      state.value = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const {sendcontactid} = contactSlice.actions

export default contactSlice.reducer