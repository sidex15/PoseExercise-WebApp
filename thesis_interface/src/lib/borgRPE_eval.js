// How would you describe your level of breathlessness during exercise? (Options: Borderline uncomfortable, Breathing heavily, Comfortable)
// How would you describe your ability to speak during exercise? (Options: Can speak a sentence, Can hold a short conversation, Easy to breath and carry a conversation)
function evalExercise(breathlessness, speechAbility){

    let exercise_intensity;

    if (breathlessness === 'Borderline uncomfortable' && speechAbility === 'Can speak a sentence') {
        exercise_intensity = 'Vigorous Activity';
    } else if (breathlessness === 'Breathing heavily' && speechAbility === 'Can hold a short conversation') {
        exercise_intensity = 'Moderate Activity';
    } else if (breathlessness === 'Comfortable' && speechAbility === 'Easy to breath and carry a conversation') {
        exercise_intensity = 'Light Activity';
    } else {
        exercise_intensity = 'Light Activity';
    }

    if(exercise_intensity == 'Vigorous Activity'){
        return [9, exercise_intensity];
    }else if(exercise_intensity == 'Moderate Activity'){
        return [3.8, exercise_intensity];
    }else if(exercise_intensity == 'Light Activity'){
        return [2.8, exercise_intensity];
    }

}

// let met_val = evalExercise('Borderline uncomfortable', 'Can speak a sentence');
// let val1 = met_val[0];
// let val2 = met_val[1];
// console.log(val1);

export default evalExercise;

// console.log(evalExercise('borderline uncomfortable', 'can speak a sentence')); // Outputs: "Vigorous Activity"
// console.log(evalExercise('breathing heavily', 'can hold a short conversation')); // Outputs: "Moderate Activity"
// console.log(evalExercise('comfortable', 'easy to breath and carry a conversation')); // Outputs: "Light Activity"
// console.log(evalExercise('comfortable', 'can hold a short conversation'));
// https://maximizepotentialtx.com/uncategorized/the-rating-of-perceived-exertion-rpe-scale/