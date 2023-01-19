// module.exports = (stdout) => {
//   console.log('hi from parser');
//   const containers = [];
//   const dockerStats = stdout.trim();
//   const conts = dockerStats.split('\n');

//   for (let i = 0; i < conts.length; i++) {
//     containers.push(JSON.parse(conts[i]));
//     console.log(JSON.parse(conts[i]));
//   }
//   //returns array of proper objects to then be stringified
//   return containers;
// };

module.exports = (input) => {
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
