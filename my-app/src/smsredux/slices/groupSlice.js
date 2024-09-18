import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 1,
}

export const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    
    sendgroupid: (state, action) => {
    //   console.log("group entered"); 
    //   console.log(action.payload); 
      state.value = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const {sendgroupid} = groupSlice.actions

export default groupSlice.reducer