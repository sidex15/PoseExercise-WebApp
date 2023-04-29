import calcAngle from './angle_calculator';

function validateExercise(type, landmarks, prevPred, currentPred, countReset, durationReset, repsProgress) {

    function pushupValidator(){
        const leftWrist = [landmarks[15].x, landmarks[15].y, landmarks[15].z];
        const leftElbow = [landmarks[13].x, landmarks[13].y, landmarks[13].z];
        const leftShoulder = [landmarks[11].x, landmarks[11].y, landmarks[11].z];
        const rightWrist = [landmarks[16].x, landmarks[16].y, landmarks[16].z];
        const rightElbow = [landmarks[14].x, landmarks[14].y, landmarks[14].z];
        const rightShoulder = [landmarks[12].x, landmarks[12].y, landmarks[12].z];

        var counter = 0;

        const exercise_assessment = {
            count: counter,
            countReset: countReset,
            durationReset: durationReset,
            pTime: undefined,
            cTime: undefined,
            startPosition: undefined
        }

        // console.log("Current:" + currentPred, "Previous:" + prevPred);
        if(currentPred == "Pushups Down" && prevPred == "Pushups Up"){
            if(countReset == true){
                countReset = false; 
            }
            var leftHand = calcAngle(leftWrist, leftElbow, leftShoulder);
            var rightHand = calcAngle(rightWrist, rightElbow, rightShoulder);

            console.log("Left Hand: " + leftHand + " Right Hand: " + rightHand);

            if(rightHand <= 100 || leftHand <= 100){
                
                if(prevPred == "Pushups Up" && countReset == false){
                    counter = 0.5;
                }else{
                    counter = 0;
                }
                exercise_assessment.count = counter;
                countReset = false;
            }
            return exercise_assessment;
        }else if(currentPred == "Pushups Up"){
            
            if(repsProgress == 0 && durationReset == true){
                exercise_assessment.count = 0;
                exercise_assessment.pTime = Date.now();
                exercise_assessment.durationReset = false;
            }

            if(repsProgress == 0.5){
                exercise_assessment.count = 1;
                exercise_assessment.cTime = Date.now();
                countReset = true;
            }
            return exercise_assessment;
        }
        if(prevPred != "Pushups Up"){
            exercise_assessment.startPosition = "Pushups Up";
            return exercise_assessment;
        }
    }

    function situpValidator(){

        const leftHip = [landmarks[23].x, landmarks[23].y, landmarks[23].z];
        const leftKnee = [landmarks[25].x, landmarks[25].y, landmarks[25].z];
        const leftAnkle = [landmarks[27].x, landmarks[27].y, landmarks[27].z];
        const rightHip = [landmarks[24].x, landmarks[24].y, landmarks[24].z];
        const rightKnee = [landmarks[26].x, landmarks[26].y, landmarks[26].z];
        const rightAnkle = [landmarks[28].x, landmarks[28].y, landmarks[28].z];
        const leftShoulder = [landmarks[11].x, landmarks[11].y, landmarks[11].z];
        const rightShoulder = [landmarks[12].x, landmarks[12].y, landmarks[12].z];
        var counter = 0;

        const exercise_assessment = {
            count: counter,
            countReset: countReset,
            durationReset: durationReset,
            pTime: undefined,
            cTime: undefined,
            startPosition: undefined
        }

        // console.log("Current:" + currentPred, "Previous:" + prevPred);
        if(currentPred == "Situps Up" && prevPred== "Situps Down"){
            if(countReset == true){
                countReset = false; 
            }
            var leftLeg = calcAngle(leftHip, leftKnee, leftAnkle);
            var rightLeg = calcAngle(rightHip, rightKnee, rightAnkle);
            var leftCore = calcAngle(leftShoulder, leftHip, leftKnee);
            var rightCore = calcAngle(rightShoulder, rightHip, rightKnee);

            // console.log("Left Leg: " + leftCore + " Right Leg: " + rightCore);

            if(rightCore <= 40 || leftCore <= 40){
                
                if(prevPred == "Situps Down" && countReset == false){
                    counter = 0.5;
                }else{
                    counter = 0;
                }
                exercise_assessment.count = counter;
                countReset = false;
            }
            return exercise_assessment;
        }else if(currentPred == "Situps Down"){
            
            if(repsProgress == 0 && durationReset == true){
                exercise_assessment.count = 0;
                exercise_assessment.pTime = Date.now();
                exercise_assessment.durationReset = false;
            }

            if(repsProgress == 0.5){
                exercise_assessment.count = 1;
                exercise_assessment.cTime = Date.now();
                countReset = true;
            }
            return exercise_assessment;
        }
        if(prevPred != "Situps Down"){
            exercise_assessment.startPosition = "Situps Down";
            return exercise_assessment;
        }
        
    }

    function jumpjackValidator(){
        
        const leftElbow = [landmarks[13].x, landmarks[13].y, landmarks[13].z];
        const leftShoulder = [landmarks[11].x, landmarks[11].y, landmarks[11].z];
        const leftHip = [landmarks[23].x, landmarks[23].y, landmarks[23].z];
        const rightElbow = [landmarks[14].x, landmarks[14].y, landmarks[14].z];
        const rightShoulder = [landmarks[12].x, landmarks[12].y, landmarks[12].z];
        const rightHip = [landmarks[24].x, landmarks[24].y, landmarks[24].z];
        const leftKnee = [landmarks[27].x, landmarks[27].y, landmarks[27].z];
        const rightKnee = [landmarks[26].x, landmarks[26].y, landmarks[26].z];

        var counter = 0;
        const exercise_assessment = {
            count: counter,
            countReset: countReset,
            durationReset: durationReset,
            pTime: undefined,
            cTime: undefined,
            startPosition: undefined
        }

        // console.log("Current:" + currentPred, "Previous:" + prevPred);
        if(currentPred == "Jumping Jack Up/End" && prevPred == "Jumping Jack Down/Start"){
            if(countReset == true){
                countReset = false; 
            }
            var leftHand = calcAngle(leftElbow, leftShoulder, leftHip);
            var rightHand = calcAngle(rightElbow, rightShoulder, rightHip);
            var leftLeg = calcAngle(rightHip, leftHip, leftKnee);
            var rightLeg = calcAngle(leftHip, rightHip, rightKnee);

            // FOR DEBUGGING ONLY [TRACK BODY PART ANGLES]
            // console.log("Left: " + leftHand, "Right: " + rightHand);
            // console.log("Left leg: " + leftLeg + "Right leg: " + rightLeg);

            if((rightHand >= 150 || leftHand >= 150) && (rightLeg >= 100 || leftLeg >= 100)){
                
                // console.log("Flag 3", countReset, " Prev Predict: " + prevPred);

                if(prevPred == "Jumping Jack Down/Start" && countReset == false){
                    counter = 0.5;
                }else{
                    counter = 0;
                }
                exercise_assessment.count = counter;
                countReset = false;
            }
            return exercise_assessment;
        }else if(currentPred == "Jumping Jack Down/Start"){
            
            if(repsProgress == 0 && durationReset == true){
                exercise_assessment.count = 0;
                exercise_assessment.pTime = Date.now();
                exercise_assessment.durationReset = false;
            }

            if(repsProgress == 0.5){
                exercise_assessment.count = 1;
                exercise_assessment.cTime = Date.now();
                countReset = true;
            }

            return exercise_assessment;
        }
        if(prevPred != "Jumping Jack Down/Start"){
            exercise_assessment.startPosition = "Jumping Jack Down/Start";
            return exercise_assessment;
        }
    }

    function plankValidator(landmarks){
        
        const leftShoulder = [landmarks[11].x, landmarks[11].y, landmarks[11].z];
        const leftElbow = [landmarks[13].x, landmarks[13].y, landmarks[13].z];
        const leftWrist = [landmarks[15].x, landmarks[15].y, landmarks[15].z];
        const rightShoulder = [landmarks[12].x, landmarks[12].y, landmarks[12].z];
        const rightWrist = [landmarks[16].x, landmarks[16].y, landmarks[16].z];
        const rightElbow = [landmarks[14].x, landmarks[14].y, landmarks[14].z];
        const leftHip = [landmarks[23].x, landmarks[23].y, landmarks[23].z];
        const leftKnee = [landmarks[25].x, landmarks[25].y, landmarks[25].z];
        const leftAnkle = [landmarks[27].x, landmarks[27].y, landmarks[27].z];
        const rightHip = [landmarks[24].x, landmarks[24].y, landmarks[24].z];
        const rightKnee = [landmarks[26].x, landmarks[26].y, landmarks[26].z];
        const rightAnkle = [landmarks[28].x, landmarks[28].y, landmarks[28].z];

        var leftArm = calcAngle(leftWrist, leftElbow, leftShoulder);
        var rightArm = calcAngle(rightWrist, rightElbow, rightShoulder);
        var leftCore = calcAngle(leftShoulder, leftHip, leftKnee);
        var rightCore = calcAngle(rightShoulder, rightHip, rightKnee);
        var leftLeg = calcAngle(leftHip, leftKnee, leftAnkle);
        var rightLeg = calcAngle(rightHip, rightKnee, rightAnkle);
        var leftPit = calcAngle(leftElbow, leftShoulder, leftHip);
        var rightPit = calcAngle(rightElbow, rightShoulder, rightHip);  
        var hipDistance = Math.abs((landmarks[12].y*100) - (landmarks[23].y*100));

        // console.log("Left Arm: " + leftArm + " Right Arm: " + rightArm);
        // console.log("Left Core: " + leftCore + " Right Core: " + rightCore);
        // console.log("Left Pit: " + leftPit + " Right Pit: " + rightPit);

        // console.log("Shoulder(Y): " + landmarks[12].y*100 + " Hip(Y): " + landmarks[23].y*100);
        // console.log(hipDistance);

        var counter = 0;
        const exercise_assessment = {
            count: counter,
            countReset: countReset,
            durationReset: durationReset,
            pTime: undefined,
            cTime: undefined,
            startPosition: undefined
        }

        if(currentPred == "Plank"){
            if((leftArm >= 80 || rightArm >= 80) && ((leftCore >= 140 && leftCore <= 170) || (rightCore >= 145 && rightCore <= 170)) && (leftPit >= 75 || rightPit >= 75) && hipDistance <= 8){
                exercise_assessment.count = 1;
                console.log("Right Plank");
            }else{
                console.log("Wrong Plank");
            }
            return exercise_assessment;
        }

    }

    function squatValidator(landmarks){

        const leftHip = [landmarks[23].x, landmarks[23].y, landmarks[23].z];
        const leftKnee = [landmarks[25].x, landmarks[25].y, landmarks[25].z];
        const leftAnkle = [landmarks[27].x, landmarks[27].y, landmarks[27].z];
        const rightHip = [landmarks[24].x, landmarks[24].y, landmarks[24].z];
        const rightKnee = [landmarks[26].x, landmarks[26].y, landmarks[26].z];
        const rightAnkle = [landmarks[28].x, landmarks[28].y, landmarks[28].z];
        
        var counter = 0;
        const exercise_assessment = {
            count: counter,
            countReset: countReset,
            durationReset: durationReset,
            pTime: undefined,
            cTime: undefined,
            startPosition: undefined
        }

        console.log("Current:" + currentPred, "Previous:" + prevPred);
        if(currentPred == "Squat Down" && prevPred == "Squat Up"){
            if(countReset == true){
                countReset = false; 
            }
            var left = calcAngle(leftHip, leftKnee, leftAnkle);
            var right = calcAngle(rightHip, rightKnee, rightAnkle);

            // console.log("Left: " + left + " Right: " + right);
            if(right <= 70 || left <= 70){
                if(prevPred == "Squat Up" && countReset == false){
                    console.log("Flag 1");
                    counter = 0.5;
                }else{
                    counter = 0;
                }
                exercise_assessment.count = counter;
                countReset = false;
            }
            return exercise_assessment;
        }else if(currentPred == "Squat Up"){
            
            if(repsProgress == 0 && durationReset == true){
                exercise_assessment.count = 0;
                exercise_assessment.pTime = Date.now();
                exercise_assessment.durationReset = false;
            }

            if(repsProgress == 0.5){
                exercise_assessment.count = 1;
                exercise_assessment.cTime = Date.now();
                countReset = true;
            }
            return exercise_assessment;
        }
        if(prevPred != "Squat Up"){
            exercise_assessment.startPosition = "Squat Up";
            return exercise_assessment;
        }
    }
    switch(type){
        case "Push Up":
            return pushupValidator(landmarks);
        case "Sit Up":
            return situpValidator(landmarks);
        case "Plank":
            return plankValidator(landmarks);
        case "Squat":
            return squatValidator(landmarks);
        case "Jumping Jack":
            return jumpjackValidator(landmarks);
    }
}

export default validateExercise;

// console.log(validateExercise({type: "Squat", landmarks: [0,1,2,3], prevPred: "Squat Up", currentPred: "Squat Up"}));
