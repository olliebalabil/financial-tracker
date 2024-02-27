const { Router } = require('express');

const userController = require('../controllers/user');


const userRouter = Router();

userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.get('/account/id/:id', userController.getAccountById);
userRouter.get('/account/username/:username', userController.getAccountByUsername)
userRouter.patch('/updateCurrentBalance/:id',userController.updateBalance)

module.exports = userRouter;
