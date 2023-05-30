import convertExercise from './convert_exercise';
import requestPrediction from './model_predict';

export default async function getPrediction(landmark){
    // PASS THE LANDMARK DATA COORDINATES TO REQUEST PREDICTION FUNCTION
    const response = await requestPrediction(landmark);

    // CONVERT THE RESPONSE FROM STRING OR NUMERICAL VALUE TO READABLE TEXT (PUSHUP,SITUPS,ETC.)
    return convertExercise(response);
}