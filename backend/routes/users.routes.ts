import {Router} from "express";
import {UsersController} from "../controllers/users.controller";
import {authMiddleware} from "../middlewares/auth";

const router = Router();

const userController = new UsersController;

//Endpoints

//Posts

router.post('/newUser', userController.createUser);
router.post('/login', userController.loginUser);

router.use(authMiddleware);

//Puts

router.put('/users/me', userController.updateGeneralDatas);
router.put('/users/password', userController.updatePassword);

//Deletes

router.delete('/users/me', userController.deleteUser);

export {router as usersRouter};