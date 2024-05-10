import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {  Route, RouterProvider, createBrowserRouter , createRoutesFromElements } from 'react-router-dom'
import Home from './pages/Home.tsx'
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'
import Chat from './pages/Chat.tsx'
import AIChatBoat from './pages/AIChatBoat.tsx'
import UserProfile from './pages/UserProfile.tsx'




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>

      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/chat' element={<Chat />} />
      <Route path='/chatboat' element={<AIChatBoat />} />
      <Route path='/user/:id' element={<UserProfile />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
