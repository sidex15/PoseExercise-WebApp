// How would you describe your level of breathlessness during exercise? (Options: Borderline uncomfortable, Breathing heavily, Comfortable)
// How would you describe your ability to speak during exercise? (Options: Can speak a sentence, Can hold a short conversation, Easy to breath and carry a conversation)
function evalExercise(breathlessness, speechAbility){

    let exercise_intensity;

    if (breathlessness === 'borderline uncomfortable' && speechAbility === 'can speak a sentence') {
        exercise_intensity = 'Vigorous Activity';
    } else if (breathlessness === 'breathing heavily' && speechAbility === 'can hold a short conversation') {
        exercise_intensity = 'Moderate Activity';
    } else if (breathlessness === 'comfortable' && speechAbility === 'easy to breath and carry a conversation') {
        exercise_intensity = 'Light Activity';
    } else {
        exercise_intensity = 'Light Activity';
    }

    if(exercise_intensity == 'Vigorous Activity'){
        return 9;
    }else if(exercise_intensity == 'Moderate Activity'){
        return 3.8;
    }else if(exercise_intensity == 'Light Activity'){
        return 2.8;
    }

}


export default evalExercise;

// console.log(evalExercise('borderline uncomfortable', 'can speak a sentence')); // Outputs: "Vigorous Activity"
// console.log(evalExercise('breathing heavily', 'can hold a short conversation')); // Outputs: "Moderate Activity"
// console.log(evalExercise('comfortable', 'easy to breath and carry a conversation')); // Outputs: "Light Activity"
// console.log(evalExercise('comfortable', 'can hold a short conversation'));
// https://maximizepotentialtx.com/uncategorized/the-rating-of-perceived-exertion-rpe-scale/