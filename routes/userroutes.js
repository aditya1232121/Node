const express = require('express');
const userController = require('../controllers/usercontroller');
const authController = require('../controllers/authcontroller');
const mulyer = require('multer');

const upload = mulyer({ dest: 'public/img/users' }); // destination where the file will be stored that is the images 



const userRouter = express.Router(); // using routes as a middleware

// Signup route
userRouter.route('/signup').post(authController.signup);

// Login route
userRouter.route('/login').post(authController.login);

// Forgot password route
userRouter.route('/forgotPassword').post(authController.forgotPassword);

// Reset password route
userRouter.route('/resetPassword/:token').patch(authController.resetPassword);

// Update password route
userRouter.route('/updatePassword').patch(authController.protect, authController.updatePassword);

// Delete me route
userRouter.route('/deleteme').delete(authController.protect, userController.deleteme);

// Routes for all users
userRouter
  .route('/')
  .get(userController.getallusers)
  .post(userController.createuser);

// Routes for specific user by ID
userRouter
  .route('/:id')
  .get(userController.getuser)
  .patch(userController.updateuser)
  .delete(userController.deleteuser);

userRouter
.route('/updateMe')
.patch(authController.protect, upload.single('photo'), userController.updateMe);


module.exports = userRouter;