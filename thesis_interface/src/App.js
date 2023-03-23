import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Signup";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Userinfo from "./pages/Personal_details";
import Userinfo2 from "./pages/Biometrics";
import Invcode from "./pages/Invite-code";
import Reg_success from "./pages/Reg-success";

function App() {
  return (
    <div className="App h-full">
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />  
        <Route path="/step-1" element={<Userinfo />} />
        <Route path="/step-2" element={<Userinfo2 />} />
        <Route path="/step-3" element={<Invcode />} />
        <Route path="/all-set" element={<Reg_success />} />
        <Route path="/nav" element={<Navbar />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
