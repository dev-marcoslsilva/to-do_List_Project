import express from "express";
import {usersRouter} from "./routes/users.routes";  
import {tasksRouter} from "./routes/tasks.routes";
import {cors} from "cors";

const app = express();

app.use(express.json());
app.use(usersRouter);
app.use(tasksRouter);
app.use(cors());

app.listen(3000, ()=>{
    console.log('Servidor rodando na porta 3000');
});