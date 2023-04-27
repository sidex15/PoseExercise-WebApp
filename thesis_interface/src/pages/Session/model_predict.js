
async function requestPrediction(data){
    
    // SEND AN HTTP REQUEST TO THE PYTHON FLASK BACKEND THAT HOSTS ...
    // THE MACHINE LEARNING MODEL TO GET THE ML MODEL PREDICTION ON THE SENT DATA
    const response = await fetch('http://127.0.0.1:5000/predict', {
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

export { requestPrediction };