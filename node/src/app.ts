
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import usuarioRoute from './routes/usuario.route';
import mensagemRoute from './routes/mensagem.route';
import config from './config';
import http from 'http';
import socketIo from 'socket.io';
import socket from './socket';

export class App {
    private express: express.Application;
    private porta = 3333;
    private server: http.Server;
    private io: SocketIO.Server;

    constructor() {
        this.express = express();
        this.middlewares();
        this.sockets();
        this.database();
        this.routes();
        this.listen();
    }

    private middlewares(): void {
        this.express.use(express.json());
        this.express.use(cors());
    }

    private sockets(): void {
        this.server = http.createServer(this.express);
        this.io = socketIo(this.server);
    }

    private database(): void {
        mongoose.connect(config.connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }

    private routes(): void {
        this.express.use('/usuarios', usuarioRoute);
        this.express.use('/mensagem', mensagemRoute);
    }

    private listen(): void {

        this.server.listen(this.porta, () => {
          console.log('Servidor rodando na porta ' + this.porta);
        });

        socket.iniciaSocket(this.io);
    }

    public getApp(): express.Application {
      return this.express;
    }
}