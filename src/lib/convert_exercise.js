export default function convertExercise(val){

    // CONVERTS THE NUMERICAL OR STRING VALUE FROM THE REQUEST PREDICTION (EX. 1,2,3, ETC.) AND CONVERTS IT TO READABLE TEXT
    switch (val){
        case 1 || '1':
            return "Situps Down";
        break;
        case 2 || '2':
            return "Situps Up";
        break;
        case 3 || '3':
            return "Pushups Down";
        break;
        case 4 || '4':
            return "Pushups Up";
        break;
        case 5 || '5':
            return "Plank";
        break;
        case 6 || '6':
            return "Squat Up";
        break;
        case 7 || '7':
            return "Squat Down";
        break;
        case 8 || '8':
            return "Jumping Jack Up/End";
        break;
        case 9 || '9':
            return "Jumping Jack Down/Start";
        default:
            return null;
    }
}