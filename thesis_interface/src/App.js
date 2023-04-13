import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Signup";
import { Routes, Route } from "react-router-dom";
import Userinfo from "./pages/Personal_details";
import Userinfo2 from "./pages/Biometrics";
import Invcode from "./pages/Invite-code";
import RegSuccess from "./pages/Reg-success";
import ExerRecords from "./pages/Exer_records";
import StudentRecord from "./pages/Stud_records";
import Session from "./pages/Session";
import Content from "./pages/Content";

function App() {
  return (
    <div className="App h-screen">
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/step-1" element={<Userinfo />} />
        <Route path="/step-2" element={<Userinfo2 />} />
        <Route path="/step-3" element={<Invcode />} />
        <Route path="/all-set" element={<RegSuccess />} />
        <Route path="content" element={<Content />} >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="exercise-records" element={<ExerRecords />} />
          <Route path="student-records" element={<StudentRecord />} />
          <Route path="workout-session" element={<Session />} />
        </Route>
        
      </Routes>
    </div>
  );
}

export default App;
