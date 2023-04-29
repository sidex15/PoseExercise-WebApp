function calcAngle(a, b, c) {
    let v1 = [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
    let v2 = [c[0] - b[0], c[1] - b[1], c[2] - b[2]];
    
    let v1mag = Math.sqrt(v1[0] * v1[0] + v1[1] * v1[1] + v1[2] * v1[2]);
    let v1norm = [v1[0] / v1mag, v1[1] / v1mag, v1[2] / v1mag];
  
    let v2mag = Math.sqrt(v2[0] * v2[0] + v2[1] * v2[1] + v2[2] * v2[2]);
    let v2norm = [v2[0] / v2mag, v2[1] / v2mag, v2[2] / v2mag];
    
    let res = v1norm[0] * v2norm[0] + v1norm[1] * v2norm[1] + v1norm[2] * v2norm[2];
    
    let angle = Math.acos(res);
    
    // THIS ROUND THE COMPUTED ANGLE VALUE
    return Math.round(angle * 180 / Math.PI, 0);
  }

export default calcAngle;
// console.log(calcAngle([0.35, 0.45, 0.36], [0.25, 0.13, 0.45], [0.23, 0.25, 0.26]));