// //creating call back hell (triangular nesting!)
const fs = require("fs");
var sag = require("C:/Users/Abu Taleb/AppData/Roaming/npm/node_modules/superagent");
// fs.readFile(`${__dirname}/dog.txt`, "utf-8", (err, data) => {
//   console.log("Breed: ", data);
//   sag.get(`https://dog.ceo/api/breed/${data}/images/random`).end((err, res) => {
//     if (err) return console.log(err);
//     let data = res.body.message;
//     console.log(data);
//     fs.writeFile("dog-img.txt", data, (err) => {
//       if (err) console.log(err);
//       console.log("image fetched succesfully 1");
//     });
//   });
// });
// //Note: too much call backs like this can create isues to maintain, reduce code
// //readability  at that time  and sometimes a heavy operation for eventloop and threadpools!
// //so modification is necessary->
// //introduction of then (constains the return value of promises in its variable!)
// fs.readFile(`${__dirname}/dog.txt`, "utf-8", (err, data) => {
//   console.log("Breed: ", data);
//   sag
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then((res) => {
//       let data = res.body.message;
//       console.log(data);
//       fs.writeFile("dog-img.txt", data, (err) => {
//         if (err) console.log(err);
//         else console.log("image-fetched successfully 2");
//       });
//     })
//     .catch((err) => {
//       if (err) console.log("raat error");
//     });
// });

// //most advanced way using promises
// //linear nesting instead of triangular nesting (call back hell)
const readFilepromise = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, "utf-8", (err, data) => {
      if (err) reject("File not found");
      resolve(data);
    });
  });
};
const writeFilepromise = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("could not write");
      resolve("image-fetched successfully 3");
    });
  });
};
// readFilepromise(`${__dirname}/dog.txt`)
//   .then((data) => {
//     console.log("Breed: ", data);
//     return sag.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((res) => {
//     let data = res.body.message;
//     console.log(data);
//     return writeFilepromise("dog-img.txt", data);
//   })
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     //one error func will handle all the error of three then!
//     if (err) console.log("error");
//   });

// //Async /await ->compresses linear chained function to shape of block function
// //async key word refers to a special function without blocking eventloop
// //and runs annoynomusly on background!
// //destroys then handlers.
const getDogPic = async (file_name) => {
  try {
    let data = await readFilepromise(file_name);
    let fetch1 = sag.get(`https://dog.ceo/api/breed/${data}/images/random`);
    let fetch2 = sag.get(`https://dog.ceo/api/breed/${data}/images/random`);
    let fetch3 = sag.get(`https://dog.ceo/api/breed/${data}/images/random`);
    //waiting for multiple promises simulitanously VIP (parallel processing)
    let all = await Promise.all([fetch1, fetch2, fetch3]);
    //extracting info from multi promise array by using other promise functions!
    let img_link = all.map((el) => el.body.message);
    let write_link = await writeFilepromise("dog-img.txt", img_link.join("\n"));
    console.log(img_link); //links
    console.log(write_link); //final result
  } catch (err) {
    console.log(err);
    throw err; //if error then dont accept "doogy doogy" rather throw err
  }
  return "Doogy Doggy"; //return values of async functions are return value of promises!
};
//getDogPic(`${__dirname}/dog.txt`);

//Handling error and return values from async functions by IIFE
(async () => {
  try {
    console.log("1");
    const x = await getDogPic(`${__dirname}/dog.txt`);
    console.log(x);
    console.log("2");
  } catch (err) {
    console.log(err);
  }
})();
