import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: "",
}

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    
    sendmessageid: (state, action) => {
      console.log("message entered"); 
      console.log(action.payload); 
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {sendmessageid} = messageSlice.actions

export default messageSlice.reducer