import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from "../database/models";
import 'dotenv/config';

const User = db.User;

export class AuthUserService {
  async login(login: string, password: string) {
    try {
      const user = await User.findOne({
        where: {
          login: login,
        },
      });

      if (!user) throw new Error("Usuário ou senha incorretos");

      const isPasswordCorrect = await bcrypt.compare(password, user.senha);

      if (!isPasswordCorrect)
        throw new Error("Usuário ou senha incorretos");

      const token = jwt.sign(
        {id: user.id, name : user.name},
        process.env.JWT_TOKEN_PASS as string,
        {expiresIn: "30d"}
    );

      return {user, token};

    } catch (error) {
      console.error("ERRO DETALHADO NO LOGIN:", error);
      throw new Error("Não foi possível fazer login!");
    }
  }
}
