import { where } from "sequelize";
import db from "../database/models";

const Task = db.Task;
const User = db.User;

//interface utilizada para facilitar a tipagem. Lembra muito uma struct
interface dataTasks {
  id: number;
  deadline?: Date;
  name: string;
  description: string;
  cost?: Date;
  url_image?: string;
  id_user: number;
}


export class TasksService {
  
  // Crud

  async CreateTaks(userId: number, data: dataTasks) {
    if (!data.name || !data.description) {
      throw new Error("Nome e descrição da tarefa são obrigatórios!");
    }

    try {
      const newTask = await Task.create({
        name: data.name,
        description: data.description,
        deadline: data.deadline,
        cost: data.cost,
        url_image: data.url_image,
        id_user: userId
      });

      return newTask;
    } catch (error) {
      throw new Error("Erro ao criar tarefa no banco de dados");
    }
  }

  //cRud

  async findAllTasks(UserId: number) {
    try {
      const allTasks = await Task.findAll({
        where: {
          id_user: UserId,
        },
      });

      return allTasks;
    } catch (error) {
      throw new Error("Erro ao buscar as tarefas!");
    }
  }

  async findTasksByName(userId: number, name: string) {
    if (name.length < 4) return [];

    try {
      const task = await Task.findAll({
        where: {
          id_user: userId,
          name: { [db.Sequelize.Op.substring]: name },
        },
        limit: 5,
      });

      return task;
    } catch (error) {
      throw new Error("Erro ao buscar a tarefa!");
    }
  }

  // async findTasksByDeadline(userId: number, deadline: Date) {
  //   try {
  //     const tasks = await Task.findAll({
  //       where: {
  //         deadline: { [db.Sequelize.Op.substring]: deadline },
  //         id_user: userId,
  //       },
  //       limit: 5,
  //     });

  //     return tasks;
  //   } catch (error) {
  //     throw new Error("Erro ao consultar tarefas");
  //   }
  // }

  async findDailyTasks(userId: number) {
    //Primeiro, preciso saber quantas tarefas por dia o usuário faz
    try {
      const dailyTasks = await User.findOne({
        attributes: ["how_much_tasks"],
        where: {
          id: userId,
        },
      });

      //define as variáveis

      const withDeadline = Math.trunc((dailyTasks * 6) / 10); // Quantas tarefas com prazo?
      let withoutDeadline = dailyTasks - withDeadline;
      let tasks = [dailyTasks];

      //busca todas as tarefas com e sem prazo
      const deadlineTasks = await Task.findAll({
        where: {
          id_user: userId,
          deadline: {
            [db.Sequelize.Op.ne]: null,
          },
          status: "Aberto",
        },
        order: [["deadline", "ASC"]],
        limit: withDeadline,
      });

      const noDeadlineTasks = await Task.findAll({
        where: {
          id_user: userId,
          deadline: null,
          status: "Aberto",
        },
        order: [["createdAt", "ASC"]],
        limit: withoutDeadline,
      });

      tasks = [...deadlineTasks];

      const remainingSlots = dailyTasks - tasks.length;
      const additionalTasks = noDeadlineTasks.slice(0, remainingSlots);

      tasks = [...deadlineTasks, ...additionalTasks];

      return tasks;
    } catch (error) {
      throw new Error("Erro ao buscar as tarefas diárias!");
    }
  }

  async FindOverdueOrCompletedTasks(userId: number, tam: number) {
    try {
      const currentDate = new Date();

      const tasks = await Task.findAll({
        where: {
          id_user: userId,
          [db.Sequelize.Op.or]: [
            { status: "Concluída" }, // primeira condição

            {
              status: { [db.Sequelize.Op.ne]: "Aberto" }, //Segunda condição
              deadline: { [db.Sequelize.Op.lt]: currentDate },
            },
          ],
        },
        order: [["deadline", "ASC"]],
        limit: tam,
      });

      return tasks;
    } catch (error) {
      throw new Error("Erro ao consultar tarefas atrasadas ou concluídas!");
    }
  }

  //crUd

  async putStatus(id: number, userId: number) {
    try {
      const taskForUpdate = await Task.findOne({
        where: {
          id: id,
          id_user: userId,
        },
      });

      if (!taskForUpdate) throw new Error("Tarefa não encontrada!");

      const newStatus =
        taskForUpdate.status == "Aberto" ? "Concluído" : "Aberto";
      const isUpdated = await Task.update({ newStatus });

      return isUpdated;
    } catch (error) {
      throw new Error("Não foi possível atualizar o status da tarefa!");
    }
  }

  async putGeneralDatas(
    taskId: number,
    userId: number,
    data: Partial<dataTasks>
  ) {

    if (data.description == "" || data.name == "")
      throw new Error(
        "Não é permitido criar uma tarefa sem nome ou descrição!"
      );

    try {
      const taskForUpdate = await Task.findOne({
        where: {
          id: taskId,
          id_user: userId,
        },
      });

      if (!taskForUpdate) throw new Error("Tarefa não encontrada!");

      const isupdatedTask = await taskForUpdate.update(data);
      return isupdatedTask;
    } catch (error) {
      throw new Error("Não foi possível atualizar os dados dessa tarefa!");
    }
  }


  //cruD

  async deleteTask(taskId: number, userId: number){
    try {
      const taskForDelete = await Task.findOne({
        where: {
          id_user : userId,
          id : taskId
        }
      });

      if(!taskForDelete) throw new Error("Não foi possível encontrar a tarefa pra deleção!");

      await taskForDelete.destroy();

      return {deleted: true};
      
    } catch (error) {
      throw new Error("Não foi possível apagar a tarefa!");
      
    }
  }
}
