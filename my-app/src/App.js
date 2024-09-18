import React from 'react'
import { Outlet } from 'react-router-dom'
import Home from './Component/Home'
import { Provider } from 'react-redux'
import { store } from './smsredux/smsstore'

export default function App() {
  return (
    <div>
      <Provider store={store}>
      <Home/>
      <Outlet/>
      </Provider>
    </div>
  )
}
