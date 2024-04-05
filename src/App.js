import "./App.css";
import Home from "./page/home/Home";
import Profile from "./page/Profile/Profile";
import Auth from "./page/Auth/Auth";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Chat from "./page/Chat/Chat";
function App() {
  const user = useSelector((state) => state.authReducer.authData)
  console.log(user,"user in authreducer after login");
  return (
    <div className="App">
      <div className="blur" style={{ top: "-18%", right: "0" }}></div>
      <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>

      <Routes>
        <Route path='/' element={user ? <Home/> : <Navigate to="auth" />} />
        <Route path="/home" element={user ? <Home /> : <Navigate to="../auth" />} />
        <Route path="/auth" element={user ? <Navigate to='../home' /> : <Auth />} />
        <Route path="/profile/:id" element={user ? <Profile /> : <Navigate to="../auth" />} />
        <Route path="/chat" element={user?<Chat/>:<Navigate to= "../auth"/> } />
     </Routes>
    </div>
  );
}

export default App;
