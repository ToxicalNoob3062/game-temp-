let command = "npm-run-all -p -r";
for (let i = 0; i < 100; i++) {
  command += " client";
}

exec(command, (error, stdout, stderr) => {
  console.log(error, stdout, stderr);
});
