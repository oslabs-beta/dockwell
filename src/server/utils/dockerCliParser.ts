module.exports = (input: any) => {
  const output = [];
  let clean = input.trim();
  clean = clean.split('\n');

  for (let i = 0; i < clean.length; i++) {
    if (clean[i] !== '') {
      try {
        output.push(JSON.parse(clean[i]));
      } catch (err) {
        output.push(clean[i]);
      }
    }
  }
  return output;
};
