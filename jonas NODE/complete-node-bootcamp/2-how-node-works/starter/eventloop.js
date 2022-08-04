const crypto = require("crypto");
const fs = require("fs");
const os = require("os");
//changing number of thread pool
process.env.UV_THREADPOOL_SIZE = 1;
let start = Date.now();
fs.readFile("test-file.txt", (err, data) => {
  console.log("IO finised");
  console.log("-----eventloop-----");
  setTimeout(() => console.log("timeout1"), 2000);
  setTimeout(() => console.log("timeout2"), 0);
  setImmediate(() => console.log("code runs immediately"));
  process.nextTick(() => console.log("process next tick "));

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "passsword encrypted 1");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "passsword encrypted 2");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "passsword encrypted 3");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "passsword encrypted 4");
  });
});

console.log("I am the top level code yeah");
