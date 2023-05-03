function average(arr) {
    // Calculates the average of a set of numbers in an array
    if (arr.length === 0) {
      return 0;
    }
    const sum = arr.reduce((acc, curr) => acc + curr);
    return sum / arr.length;
}

// console.log(average([1.2,3,2,1,1.9]));

export default average;