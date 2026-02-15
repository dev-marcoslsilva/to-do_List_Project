import {Router} from "express";
import {TasksController} from "../controllers/tasks.controller";
import {authMiddleware} from "../middlewares/auth";

const router = Router();
const tasksController = new TasksController();

router.use(authMiddleware);

//Endpoints

//Posts

router.post('/tasks', tasksController.createTask);

//Gets

router.get('/tasks', tasksController.getAllTasks);
router.get('/tasks/search', tasksController.getByName);
router.get('tasks/daily', tasksController.getDailyTasks);
router.get('/tasks/special', tasksController.getOverdueOrFinalizedTasks);


//Puts

router.put('/tasks/:taskId', tasksController.updateGeneralTasks);
router.patch('/tasks/updateStatus/:id', tasksController.updateStatus);

//Deletes

router.delete('/tasks/:taskId', tasksController.deleteTask);

export {router as tasksRouter};