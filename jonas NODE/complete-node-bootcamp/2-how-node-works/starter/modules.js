//every file of node js is wrapped in a immediately invoked function
let test_of_IIF = console.log(arguments);
//see the wrapper function
let wrapper = require("module").wrapper;
console.log(wrapper);
//remember module load only once->so its caching
