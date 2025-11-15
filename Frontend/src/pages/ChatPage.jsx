import React from 'react'
import { useAuthStore } from '../store/useAuthStore'

function Chatpage() {
  const {logout} =useAuthStore();
  return <div className='z-10'>Chatpage
  <button onClick={logout}>Logout</button></div>
}

export default Chatpage