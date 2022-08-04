const fs = require("fs");
const sv = require("http").createServer();

sv.on("request", (req, res) => {
  //sol1->will upload the whole file once
  //but if the file is big then it will take a lot of time and others users have to w8
  fs.readFile("test-file.txt", "utf-8", (err, data) => {
    if (err) console.log("Error hoise mama!");
    res.end(data);
  });
  //sol2 streams send data by chunks
  let readable = fs.createReadStream("test-file.txt");
  readable.on("data", (chunk) => {
    res.write(chunk);
  });
  readable.on("end", () => {
    res.end("stream done");
  });
  readable.on("error", (err) => {
    console.log(err);
    res.statusCode = 500;
    res.end("file sending unsuccesful");
  });
  //sol3->solves backpressure (if recieves very fast but cant display that fast
  //readbalesource.pipe(writable destination)
  readable.pipe(res);
});

sv.listen(8000, "127.0.0.1", (req, res) => {
  console.log("listening ....");
});
