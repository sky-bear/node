const fs = require("fs");
const path = require("path");

const fullFileName = name => path.resolve(__dirname, "files", name);

// const readFile = pathName => {
//   fs.readFile(pathName, (err, data) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     console.log(data.toString());
//     return data.toString();
//   });
// };

const readFile = pathName =>
  new Promise((resolve, reject) => {
    fs.readFile(pathName, (err, data) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(data.toString());
      console.log(123);
    });
  });

const readFileAll = async () => {
  const data_1 = await readFile(fullFileName("a.json"));
  const data_2 = await readFile(fullFileName(JSON.parse(data_1).next));
  const data_3 = await readFile(fullFileName(JSON.parse(data_2).next));
  console.log(data_3);
};
readFileAll();
