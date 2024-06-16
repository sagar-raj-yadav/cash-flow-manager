import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx';
import Profile from './Component/Profile.jsx';
import { Provider } from 'react-redux';
import store from "./redux/store.js"; // Import the Redux store


import {RouterProvider,createBrowserRouter} from 'react-router-dom';

const res=createBrowserRouter([
  {path:'/',element:<App />},
  {path:'/profile',element:<Profile />}
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={res} />
  </Provider>,
)
