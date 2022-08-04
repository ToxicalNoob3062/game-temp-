const dotenv = require('dotenv');
const app = require('./app');
dotenv.config({ path: './config.env' });

const print = (pstuffs) => {
  console.log(...pstuffs);
};
//listening to client of our api!
const port = process.env.PORT || 3000;
app.listen(port, () => {
  print(['listening to app at port 3000']);
});
