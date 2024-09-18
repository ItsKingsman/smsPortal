import { configureStore } from '@reduxjs/toolkit'
import librarySlice from './slices/librarySlice'
import groupSlice from './slices/groupSlice'
import messageSlice from './slices/messageSlice'
import contactSlice from './slices/contactSlice'

export const store = configureStore({
  reducer: {
    library:librarySlice,
    group:groupSlice,
    message:messageSlice,
    contact:contactSlice
  },
})
