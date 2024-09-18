
import ReactDOM from 'react-dom/client';
import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Home from './Component/Home';
import App from './App';
import Library from './Component/Library';
import Group from './Component/Group';
import Contact from './Component/Contact';
import Message from './Component/Message';
import SmsHome from './Component/SmsHome';
import './style.css'

const router = createBrowserRouter([
  {
    path: "/",
      element: <App />,
      children: [
        {
          path: "smshome",
          element: <SmsHome />,
        },
        {
          path: "/AddLibrary",
          element: <Library />,
        },
        {
          path: "/AddGroup",
          element: <Group />,
        },
        {
          path: "/AddContact",
          element: <Contact />,
        },
        {
          path: "/AddMessage",
          element: <Message />,
        },
      ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>
);


