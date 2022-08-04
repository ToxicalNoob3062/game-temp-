const exp = require('express');
const app = exp();
const print = (pstuffs) => console.log(...pstuffs);
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
//creating middle ware
//applying a normal middleware express its functionality to all route requests!
//1:fetching information from body as json in post req!
app.use(exp.json());
//2:inserting our own information in middleware
app.use((req, res, next) => {
  print(['welcome to middle ware']);
  next();
});
//3:manupulating req obj in middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
//4:third party middle ware from module:morgan (modifies request and status in logs!)
if (process.env.NODE_ENV == 'development') app.use(morgan('dev'));

//////// repeated url structure (writing same url again and again) /////////
//get is used to read data !
// app.get('/api/v1/tours', getAllTours);
// //taking out a specific tour ananlyzing ids from urls!
// app.get('/api/v1/tours/:id', getTour);
// //post is used to send data from client to server!
// app.post('/api/v1/tours', createTour);
// //using patch to only add the addtional changes and update it!
// app.patch('/api/v1/tours/:id', updateTour);
// //to delete from data base the tours info!
// app.delete('/api/v1/tours/:id', deleteTour);

//5:routes as middleware
//creating mounting routers to write parent url only once!(more syntax saver!)
app.use('/api/v1/tours', tourRouter); //parent url here only detached from .route
app.use('/api/v1/users', userRouter);
//6:middleware suplying static files!
app.use(exp.static(`${__dirname}/public`));
//exporting api files to server!
module.exports = app;
