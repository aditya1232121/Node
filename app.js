const express = require('express');
const morgan = require('morgan'); // third part middleware

const app = express();
app.use(morgan('dev')); // returns http method , url , status code
app.use(express.json()); // it is a middle ware use of it is client giving a data then converting or modifying that data

// use of middleware --> manipulate the request like change or parsing or run a code between req and res

app.use(express.static(`${__dirname}/public`)); // used to read static file , file that are not in a formatted way , access public files using a brower

// app.use((req, res, next) => {
//   console.log('Hello from the middleware');
//   next(); // Move request forward
// });

const tourRouter = require('./routes/tourroutes');
const userRouter = require('./routes/userroutes');

// app.use((req, res, next) => {
//   console.log(' hello from the middleware');
//   next(); // code run ho gya abh move it forward
// });

// app.get('/' , (req , res) =>  // url for routing
// {
// res.status(200).send("Hello from the server side ");  // send response back to client
// // res.status(200).json({
// //     message : "Hello from the server side it is in json ",
// //     app : 'Natours'
// // })
// })

// app.post('/' , (req , res) => {
//    res.send(" You can post the url ") ;
// })
///////////////////////////////////////////

// read json file

// app.get('/api/v1/tours' , getalltours )
// app.get('/api/v1/tours/:id' , gettour)
// app.post('/api/v1/tours' ,createtour)
// app.patch('/api/v1/tours/:id' , updatetour )
// app.delete('/api/v1/tours/:id' , deletetour )

// alternate way to do it

app.use((req, res, next) => { 
req.requestTime = new Date().toISOString();
//console.log(req.headers);
next();
}   
)


app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
