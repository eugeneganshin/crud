const express = require('express');
// const userControl = require('../controllers/userController');
// const authController = require('../controllers/authController');
// const authControl = require('../controllers/authController');
// // const reviewControl = require('../controllers/reviewController');

const router = express.Router();

// router.post('/signup', authController.signUp);
// router.post('/login', authController.login);
// router.get('/logout', authController.logout);

// router.post('/forgotPassword', authController.forgotPassword);
// router.patch('/resetPassword/:token', authController.resetPassword);

// // protects all the routes below
// router.use(authController.protect);

// // password
// router.patch('/updateMyPassword', authControl.updatePassword);

// // user
// router.patch(
//   '/updateMe',
//   userControl.uploadUserPhoto,
//   userControl.resizeUserPhoto,
//   userControl.updateMe,
// );
// router.delete('/deleteMe', userControl.deleteMe);
// router.get('/me', userControl.getMe, userControl.getUser);

// router.use(authController.restrict('admin'));

// // eslint-disable-next-line prettier/prettier
// router
//   .route('/')
//   .get(userControl.getAllUsers)
//   .post(userControl.createUser);

// router
//   .route('/:id')
//   .get(userControl.getUser)
//   .patch(userControl.updateUser)
//   .delete(userControl.deleteUser);

module.exports = router;
