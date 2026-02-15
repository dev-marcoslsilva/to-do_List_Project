import {Request, Response} from 'express';
import {ServicesUsers} from "../services/userServices";
import {AuthUserService} from "../services/authUserService";

export class UsersController{

    async createUser(req: Request, res: Response){

        const userCreated = new ServicesUsers;

        try {
            const datas = req.body;

            const user = await userCreated.newUser(datas);

            return res.status(201).json(user);
        } catch (error) {
            return res.status(400).json({error: error.message});
        }
    }

    async loginUser(req: Request, res: Response){
        const userLogin = new AuthUserService;

        try {
            const login = req.body.login;
            const password = req.body.password;

            const {user, token} = await userLogin.login(login, password);

            const userResponse = {
                id : user.id,
                name : user.name,
                login: user.login
            }

            return res.status(201).json({user: userResponse, token});
        } catch (error) {
            return res.status(400).json({error: error.message});
        }
    }

    async updateGeneralDatas(req: Request, res: Response){
        const userUpdate = new ServicesUsers;

        try {
            const id = req.userId;
            const newData = req.body;

            const updatedUser = await userUpdate.putGeneralUserDatas(id, newData);

            return res.status(200).json(updatedUser);
        } catch (error) {
            return res.status(400).json({error: error.message});
        }
    }

    async updatePassword(req: Request, res: Response){
        const userUpdate = new ServicesUsers;

        try {
            const id = req.userId;
            const {newPassword} = req.body;

            await userUpdate.updateUserPassword(id, newPassword);

            return res.status(200).json({message: "Senha atualizada com sucesso!"});
        } catch (error) {
            return res.status(400).json({error: error.message});
        }
    }

    async deleteUser(req: Request, res: Response){
        const userDelete = new ServicesUsers;

        try {
            const id = req.userId;

            await userDelete.deleteAccount(id);

            return res.status(200).json({message: "Usuário deletado com sucesso!"});
        } catch (error) {
            return res.status(400).json({error: error.message});
        }

    }
}