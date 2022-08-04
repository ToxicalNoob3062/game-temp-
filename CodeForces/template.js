//runcommand Get-Content input.txt | node template.js > output.txt or Ctrl+Shift+B
// //libraries
// const heap = require("@datastructures-js/priority-queue");
// const accelerate = require("lodash");
// const linkedlist = require("@datastructures-js/linked-list");
// const { max } = require("lodash");
process.stdin.resume();
process.stdin.setEncoding("utf-8");
//
let standardInputString = "";
let currentLine = 0;
//
process.stdin.on("data", (rawData) => {
  standardInputString += rawData;
});
process.stdin.on("end", (_) => {
  standardInputString = standardInputString
    .trim()
    .split("\n")
    .map((line) => {
      return line.trim();
    });
  main();
});

function readline() {
  return standardInputString[currentLine++];
}
function print(data) {
  console.log(data);
}

//line to array of integers
//readline().split(' ').map(Number)
//  let iter=parseInt(readline())
//multiple integer construction->const [a,b,c]=integer array

function main() {
  let q = parseInt(readline());
  for (let i = 0; i < q; i++) {
    let n = parseInt(readline());
    let num = readline().split(" ").map(Number);
    print(MissionImpossible(n, num));
  }
}

