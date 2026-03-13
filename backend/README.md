# To-do Today 

Um projeto que organiza para o usuário uma sequências de tarefas para fazer durante o dia. É um algoritmo de otimização, ou seja, ele escolhe quais tarefas fazer no dia baseando-se nos prazos e custos (Quando se deseja terminar a atividade) de cada tarefa

## Tecnologias

- Node
- Express
- MySQL
- Sequelize
- Json Web Token (JWT)
- CORS
- Bycrpt
- Docker

## Instalação / rodando o projeto

- Clone o repositório (git clone https://github.com/dev-marcoslsilva/to-do_List_Project)
- Rode localmente
    - Entre na pasta correta (cd backend)
    - Instale todas as dependências (yarn install)
    - Suba a API (yarn dev)
- Ou utilize o docker, caso tenha e prefira (docker compose up -d --build)
    - Rode algum ou os dois comandos abaixo, caso o comando principal não funcione 
        - "docker compose up -f docker-compose.yml"
        - "docker compose down". Em seguida, "docker compose up -d --build --force-recreate"


## Variáveis de Ambiente

DB_USER=user
DB_PASS=password
DB_NAME=database_to_do_list
DB_HOST=root
DB_DIALECT=mysql
MYSQL_ROOT_PASSWORD=datapass
JWT_TOKEN_PASS=pass

## Estrutura de pastas

backend/ <br>
|-@types <br>
|-controllers <br>
|-database <br>
    |-config <br>
    |-migrations<br>
    |-models<br>
    |-seeders<br>
|-middlewares<br>
|-routes<br>
|-services<br>
-server.ts<br>

## Endpoints da API

## Scripts disponíveis

## Contribuição

## Licença

MIT - Todos os direitos reservados