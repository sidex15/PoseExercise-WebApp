export default async function requestPrediction(data){
    
    // SEND AN HTTP REQUEST TO THE PYTHON FLASK BACKEND THAT HOSTS ...
    // THE MACHINE LEARNING MODEL TO GET THE ML MODEL PREDICTION ON THE SENT DATA
    const response = await fetch(process.env.NEXT_PUBLIC_MODEL_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const result = await response.json();
    //   console.log(result.prediction);
      return result.prediction;
}

