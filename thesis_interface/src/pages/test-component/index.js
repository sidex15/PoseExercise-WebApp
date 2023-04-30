import { useContext } from "react";
import ExerciseContext from "@/pages/api/exercise-context";

const Test = () => {

    const {postValue} = useContext(ExerciseContext)


    return ( 
    <div> 
        {postValue}
    </div> 
    );
}
 
export default Test;