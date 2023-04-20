import { useRouter } from 'next/router';
import Dashboard from "./Dashboard";
import Login from "./Login";
import Register from "./signup";
import Userinfo from "./Personal_details";
import Userinfo2 from "./Biometrics";
import Invcode from "./Invite-code";
import RegSuccess from "./Reg-success";
import ExerRecords from "./Exer_records";
import StudentRecord from "./Stud_records";
import Session from "./Session";
import Content from "./Content";

function Routes() {
  const router = useRouter();

  return (
    <>
      {router.pathname === '/' && <Login />}
      {router.pathname === '/Signup1' && <Register />}
      {router.pathname === '/step-1' && <Userinfo />}
      {router.pathname === '/step-2' && <Userinfo2 />}
      {router.pathname === '/step-3' && <Invcode />}
      {router.pathname === '/all-set' && <RegSuccess />}
      {router.pathname === '/content' && (
        <Content>
          <Dashboard />
          <ExerRecords />
          <StudentRecord />
          <Session />
        </Content>
      )}
    </>
  );
}

export default Routes;