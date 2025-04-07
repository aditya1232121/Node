const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

// Load environment variables from the .env file
dotenv.config({ path: './config.env' });

// Replace placeholder <PASSWORD> with actual password in the DATABASE_URL
const db = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => {
    console.log('Successfully connected to the database');
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });
// console.log(app.get('env'))
//console.log(process.env) //$env:NODE_ENV="development"; nodemon server.js  it will print the environment variable in the console , we are in the development environment



// // adding data based on the scheme in the model

// const testTour = new Tour({
//   name : 'Aditya from server' ,
//   rating : 4.7 ,
//   price : 497
// })

// testTour.save().then(doc => {// saving the data in the database
//   console.log(doc)
// }).catch(err => {
//   console.log("Error :" , err);
// }) 

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// after your app and website is fored we change the evironment from development to production

// npm i dotenv to connect
// import dotenv then npm start

//  npm i eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-config-airbnb eslint-plugin-node eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react --save-dev
//eslint extension


