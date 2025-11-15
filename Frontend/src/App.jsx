import { Navigate, Route, Routes } from "react-router"
import Chatpage from "./pages/Chatpage"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react"
import PageLoader from "./components/PageLoader"
import {Toaster} from 'react-hot-toast'
function App() {
    const {checkAuth,isCheckingAuth,authUser} = useAuthStore();
    useEffect(()=>{
      checkAuth();
    },[checkAuth]);
    if(isCheckingAuth) return <PageLoader/>
  return (
       <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden">

     {/* Background */}
      <div className="absolute inset-0 bg-slate-900 -z-10" />
      <div className="absolute top-0 -left-4 size-96 bg-pink-500 opacity-20 blur-[100px]" />
      <div className="absolute bottom-0 -right-4 size-96 bg-cyan-500 opacity-20 blur-[100px]" />
    <Routes>
     <Route path="/" element={authUser ? <Chatpage/> : <Navigate to={"/Login"} />}/>
     <Route path="/login" element={!authUser ? <LoginPage/> : <Navigate to={"/"} />}/>
     <Route path="/signup" element={!authUser ? <SignUpPage/> : <Navigate to={"/"} />}/>
     </Routes>
     <Toaster/>
     </div>
  );
}
export default App