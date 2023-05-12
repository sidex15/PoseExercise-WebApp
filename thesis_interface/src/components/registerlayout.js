import Layout from "./Layout";
import Steps from "./steps";
import { useContext } from "react";
import StepsContext from "@/pages/api/steps-context";

const RegLayout = ( {children} ) => {

    const { step1, step2, step3 } = useContext(StepsContext);

    return ( 
        
    <Layout>
        <div className="h-full w-full flex items-center pl-20 gap-32">
            <Steps step1={step1} step2={step2} step3={step3}/> {/* this pass the value of step1, step2, step3 to the steps.js */}
            {children}  
        </div> 
    </Layout>
    );
}
 
export default RegLayout;