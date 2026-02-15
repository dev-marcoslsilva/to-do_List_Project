import {Request, Response} from 'express'
import {TasksService} from "../services/tasks.services"

export class TasksController{

    //Crud

    async createTask(req: Request, res: Response){
        const tasksService = new TasksService;

        try {
            const userId = req.userId;
            const taskData = req.body;

            const newTask = await tasksService.CreateTaks(userId , taskData) // por que um objeto?

            return res.status(201).json(newTask);
        } catch (error: any) {
            return res.status(400).json({error: error.message});
        }
    }
    
    //cRud
    async getDailyTasks (req : Request, res: Response){
        const DailyTasks = new TasksService;

        try {
            const userId = req.userId;

            const tasks = await DailyTasks.findDailyTasks(userId);

            return res.status(201).json(tasks);
        } catch (error : any) {
            return res.status(400).json({error: error.message});
        }
    }

    async getOverdueOrFinalizedTasks(req: Request, res: Response){
        const specialTasks = new TasksService;

        try {
            const userId = req.userId;

            const tam = req.body;

            const tasks = await specialTasks.FindOverdueOrCompletedTasks(userId, tam);

            return res.status(201).json(tasks);
        } catch (error) {
            return res.status(400).json({error: error.message});
        }
    }

    async getAllTasks (req : Request, res: Response){
        const allTasks = new TasksService;

        try {
            const userId = req.userId;

            const tasks = await allTasks.findAllTasks(userId);

            return res.status(201).json(tasks);
        } catch (error) {
            return res.status(400).json({error: error.message});
        }
    }

    async getByName(req: Request, res: Response){
        const tasksByName = new TasksService;

        try {
            const userId = req.userId;
            const {name} = req.query;

            const tasks = await tasksByName.findTasksByName(userId, name);

            return res.status(201).json(tasks);
        } catch (error) {
            return res.status(400).json({error: error.message});
        }
    }

    async updateStatus(req: Request, res: Response){
        const updateStatus = new TasksService;

        try {
            const userId = req.userId;
            const {taskId} = req.params;

            const updatedTask = await updateStatus.putStatus(Number(taskId), userId);

            return res.status(201).json(updatedTask);
        } catch (error) {
            return res.status(400).json({error: error.message});
        }
    }

    async updateGeneralTasks(req: Request, res: Response){
        const updateGeneralTasks = new TasksService;

        try {
            const userId = req.userId;
            const {taskId} = req.params;
            const taskData = req.body;

            const updatedTask = await updateGeneralTasks.putGeneralDatas(Number(taskId), userId, taskData);

            return res.status(201).json(updatedTask);
        } catch (error) {
            return res.status(400).json({error: error.message});
        }
    }

    async deleteTask(req: Request, res: Response){
        const deleteTask = new TasksService;

        try {
            const userId = req.userId;
            const {taskId} = req.params;

            await deleteTask.deleteTask(taskId, userId);

            return res.status(204).send();
        } catch (error) {
            return res.status(400).json({error: error.message});
        }
    }

}