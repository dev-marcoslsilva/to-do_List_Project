import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

interface TokenPayLoad {
  id: number;
  name: string;
  iat: number;
  exp: number;
}
// A ideia da função é: Pegar o token - validar o token - chamar o controller
//Se, em algum momento da execução do plano algo der errado, retorna o erro

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //pega o token

  //console.log("O segurança foi acionado para a rota:", req.url);
  const authHeader = req.headers.authorization;

  if (!authHeader) res.status(401).json({ error: "Token não fornecido!" });

  const [, token] = authHeader.split(" ");

  try {
    //Verifica se é válido, se ta no prazo
    const decoded = jwt.verify(token, process.env.JWT_TOKEN_PASS as string);

    const { id } = decoded as TokenPayLoad;

    req.userId = id;

    return next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido ou inexistente!" });
  }
};
