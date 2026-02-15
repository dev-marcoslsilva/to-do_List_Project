import db from "../database/models";
import bcrypt from "bcrypt";

const User = db.User;

interface dataUsers {
  id: number;
  login: string;
  password: string;
  name: string;
  how_much_tasks: number;
}

export class ServicesUsers {
  //Crud

  async newUser(data: dataUsers) {
    try {
      if (data.password == null || data.login == null) {
        throw new Error("Não é permitido criar um usuário sem login ou senha!");
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if(!emailRegex.test(data.login)) throw new Error("E-mail inválido!");
      

      if (data.how_much_tasks < 5) data.how_much_tasks = 5;

      if (data.password.length < 8)
        throw new Error("A senha deve conter, no mínimo, 8 caracteres!");

      const hashedPassword = await bcrypt.hash(data.password, 10);

      const createdUser = await User.create({
        login: data.login,
        senha: hashedPassword,
        name: data.name,
        how_much_tasks: data.how_much_tasks,
      });

      return createdUser;
    } catch (error) {
      console.log(error, );
      throw new Error("Não foi possível cadastrar o usuário!");
    }
  }

  //crUd

  async putGeneralUserDatas(userId: number, newData: Partial<dataUsers>) {
    try {
      if (newData.how_much_tasks == undefined || (newData.how_much_tasks != undefined && newData.how_much_tasks < 5))
        throw new Error("Não é permitido realizar menos de 5 tarefas!");

      const user = await User.findOne({
        where: {
          id: userId,
        },
      });

      return await user.update(newData);
    } catch (error) {
      throw new Error("Não foi possível atualizar os dados do usuário!");
    }
  }

  async updateUserPassword(userId: number, newPassword: string) {

    try {
      const user = await User.findOne({
        where: {
          id: userId,
        },
      });
  
      if (!user)
        throw new Error("Usuário não encontrado! Impossível atualizar senha");
  
      if (newPassword.length < 8)
        throw new Error(
          "Não é permitido criar uma nova senha com menos de 8 caracteres!"
        );
  
      const newHashedPassord = await bcrypt.hash(newPassword, 10);
  
      return await user.update({password : newHashedPassord}); 
    } catch (error) {
      throw new Error("Não foi possível atualizar senha!");
      
    }
  }

  //cruD

  async deleteAccount(userId: number) {
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) throw new Error("Usuário não encontrado!");

    //aqui eu tenho que destruir o Token?

    return await user.destroy();
  }
}
