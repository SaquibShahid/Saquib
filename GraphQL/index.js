const express = require('express');
const {ApolloServer} = require('@apollo/server')
const {expressMiddleware} = require('@apollo/server/express4');
const bodyParser = require('body-parser');
const cors = require('cors');
const {default : axios} = require('axios');


async function startServer() {
    const app = express();
    const server = new ApolloServer({
        typeDefs : `
        type User {
            id : ID!
            name : String!
            username : String!
            phone : String!
        }
        type Todo {
            id : ID!
            title : String!
            completed : Boolean
            userId : String!
            user : User
        }
        type Query {
            getTodos : [Todo]
            getUsers : [User]
            getUser(id : ID!) : User
        }
        `,
        resolvers : {
            Todo : {
                user : async (todo) =>
                (await axios.get(`https://jsonplaceholder.typicode.com/users/${todo.id}`)).data
            },
            Query  : {
                getTodos : async () => 
                    (await axios.get('https://jsonplaceholder.typicode.com/todos')).data,
                getUsers : async () => 
                    (await axios.get('https://jsonplaceholder.typicode.com/users')).data,
                getUser : async (parent , {id}) => 
                    (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)).data
                
            }
        }
    });

    app.use(bodyParser.json());
    app.use(cors());

    await server.start();

    app.use("/graphql", expressMiddleware(server));

    app.listen(8000 , ()=>{
        console.log(`server listening on port 8000`);
    })
}

startServer();