//learning to work with files 😏
//importing file module
const fs = require("fs");
const path = require("path");
////////////////////////////FILES//////////////////////////////
// //synchronous way->Blocking
// //reading
//let file_content = fs.readFileSync(path.resolve(__dirname, "1-node-farm/starter/txt/input.txt"), "utf8");
// //modifiying
// let file_content_modified = `This is what we know about Avagardo:${file_content}.\ncreated on ${Date.now()}`;
// //writing
// fs.writeFileSync(path.resolve(__dirname, "1-node-farm/starter/txt/input.txt"), file_content_modified);

// //asynchronous way->Non Blocking
// fs.readFile(path.resolve(__dirname, "1-node-farm/starter/txt/input.txt"), "utf-8", (err, data) => {
//   console.log(data + " " + "Async");
//   fs.writeFile(path.resolve(__dirname, "1-node-farm/starter/txt/input.txt"), file_content_modified, "utf-8", (err) => {
//     console.log("Asyncly written done");
//   });
//   //nested async deppends upon its parent here!!!!!
//   //first async function call needs to be executed without any error to execute inner neseted async calls
// });
//console.log(file_content + " " + "Sync");

///////////////////////SERVER CREATION///////////////////
//imports
const http = require("http");
const url = require("url");
const slug = require("slugify");
const replaceTemp = require("./modules/functions");
//universal data declaration so that user can use it every time and data will process only once
//templates
let tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8");
let tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8");
let tempProduct = fs.readFileSync(`${__dirname}/templates/product.html`, "utf-8");
//data from json
let data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
let js_obj = JSON.parse(data);
//making slugs for our urls using slugs module
const sluggs = js_obj.map((elem) => slug(elem.productName, { lower: true }));
console.log(sluggs); //we are not using slugs too keep things simple for now!
//user will req and we will send response according to req from server
const server = http.createServer((req, res) => {
  //url that is requested
  const { query, pathname } = url.parse(req.url, true);
  //response according to urls
  //Overview-Page
  if (pathname == "/" || pathname == "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });
    //replacing the place holder of each card and storing in array and attlast conver html array to str using join
    let cardsHtml = js_obj.map((elem) => replaceTemp(tempCard, elem)).join("");
    let output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(output);
  }
  //Product page
  else if (pathname == "/product") {
    res.writeHead(200, { "Content-type": "text/html" });
    let dataObj = js_obj[query.id];
    let output = replaceTemp(tempProduct, dataObj);
    res.end(output);
  }
  //API page
  else if (pathname == "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  }
  //NOT FOUND PAGE
  else {
    //saying to display html when 404 error occurs
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    //giving html to send
    res.end("<h1>Page Not Found</h1>");
  }
});
//testing if our server is working and can listen to req properly
server.listen(8000, "127.0.0.1", () => {
  console.log("listening to req at 8000");
});
