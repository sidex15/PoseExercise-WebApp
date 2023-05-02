function generateCode(input) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    
    for (let i = 0; i < 8; i++) {
      const charIndex = input.charCodeAt(i % input.length);
      const randomIndex = ((i + 1) * charIndex) % chars.length;
      const finalChar = chars[randomIndex];
      code += finalChar;
    }
    
    return code;
}

// console.log(generateCode("RichardAlforqueHutao"));

export default generateCode;