//Backend que vai rodar o server pela biblioteca WebSocket, utilizando variáveis de ambiente.
// 'npm init -y' para criar o package.json.
//'npm i ws' para instalar a biblioteca.
//'npm i dotenv' para criar uma variável de ambente.
// rodamos 'node src/server.js' para executar esse arquivo no primeiro momento.
// Criamos o script 'start' no package.json para rodar o arquivo com npm start.
//Criamos um script de desenvolvimento para ficar rodando o backend em caso de mudança nos arquivos
// SCRIPT: 'node --watch src/server.js', executa com 'npm run dev'.
const { WebSocketServer } = require("ws")// Importamos a classe WebSocketServer
// da biblioteca ws que instalamos.
const dotenv = require("dotenv")//Importamos a biblioteca 'dotenv' que vai criar nossa váriavel de
//ambiente no arquivo '.env'.

dotenv.config() //Executamos o método '.config()' na nossa variável de ambiente. Esse método
//fornece configurações padrão para objetos de serviços criados de modo subsequente.

const wss = new WebSocketServer({ port: process.env.PORT || 8080 })//Instanciamos o servidor.
//'new' => o JS aloca espaço na memória para o objeto e chama o construtor da classe para iniciar o objeto
//passamos o objeto para o construtor da classe'WebSocketServer'. 'port: process.env.PORT || 8080'
//pegamos a váriavel PORT no arquivo .env e colocamos o valor alternativo 8080
// O objeto process é uma variável global que possibilita 
//controlar e ter informações sobre o processo em execução do Node.

//EVENTO DE CONEXÃO DO SERVIDOR, VAMOS CAPTURAR QUANDO O CLIENTE ENTRAR NO SERVIDOR
wss.on("connection", (ws) => {// pegamos o servidor e passamos o evento connection, passamos uma callback
// e passamos o parametro ca função como 'ws'
    ws.on("error", console.error)// passamos um evento de erro para o console caso aparecer algum erro

    ws.on("message", (data) => {//Passamos uma função para ser executada sempre que alguém enviar uma
//mensagem ao servidor. Definimos o parametro 'data' que vai ser o dado que o cliente vai enviar.
        wss.clients.forEach((client) => client.send(data.toString()))// Pegamos todos os clientes que
        //estão conectados no servidor, percorremos os dados e criamos uma função para enviar para todos
        // a mensagem de 'data', e transformamos em string essa mensagem.
    })

    console.log("client connected")// Sempre que alguem se conectar ao servidor vai aparecer essa mensagem
    //no console
})