import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Signup";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Userinfo from "./pages/Personal_details";
import Card from "./components/dashCard";

function App() {
  return (
    <div className="App h-full">
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />  
        <Route path="/personal-information" element={<Userinfo />} />
        <Route path="/nav" element={<Navbar />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
