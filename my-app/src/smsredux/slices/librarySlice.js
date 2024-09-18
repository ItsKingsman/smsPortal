import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    
    sendlibraryid: (state, action) => {
      // console.log("lib entered"); 
      // console.log(action.payload); 
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {sendlibraryid} = librarySlice.actions

export default librarySlice.reducer