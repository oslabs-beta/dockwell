
export default (input: string ) => {
  const output = [];
  let clean: any = input.trim();
  const cleanArr: [] = clean.split('\n');

  for (let i = 0; i < cleanArr.length; i++) {
    if (cleanArr[i] !== '') {
      try {
        output.push(JSON.parse(cleanArr[i]));
      } catch (err) {
        output.push(cleanArr[i]);
      }
    }
  }
  return output;
};
