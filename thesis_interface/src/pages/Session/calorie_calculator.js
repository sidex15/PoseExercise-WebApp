function calcCalorie(SessionDuration, MET_val, weight){

    // Duration of physical activity in minutes × (MET × 3.5 × your weight in kg) / 200 = Total calories burned.

    calorie_burned = SessionDuration * (MET_val * 3.5 * weight)/200
    return calorie_burned;
}

export default calcCalorie;

// https://golf.procon.org/met-values-for-800-activities/ 
// https://www.calculator.net/calories-burned-calculator.html?activity=1&activity2=Cycling%3A+very+fast&chour=&cmin=3&cweight=83&cweightunit=k&ctype=1&x=91&y=20
// console.log(calcCalorie(3, 15.8, 83));
