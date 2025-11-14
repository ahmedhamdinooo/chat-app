import { Route, Routes } from "react-router"
import Chatpage from "./pages/Chatpage"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import { useAuthStore } from "./store/useAuthStore"

function App() {
  const {authUser,Login,isLoggedIn} = useAuthStore();
  console.log("auth user:", authUser);
    console.log("isLoggedIn:", isLoggedIn);

  
  return (
       <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden">

     {/* Background */}
      <div className="absolute inset-0 bg-slate-900 -z-10" />
      <div className="absolute bottom-0 -right-4 size-96 bg-cyan-500 opacity-20 blur-[100px]" />
      <button onClick={Login} className="z-10">Login</button>
    <Routes>
     <Route path="/" element={<Chatpage/>}/>
     <Route path="/Login" element={<LoginPage/>}/>
     <Route path="/Signup" element={<SignUpPage/>}/>
     </Routes>
     </div>
  );
}
export default App