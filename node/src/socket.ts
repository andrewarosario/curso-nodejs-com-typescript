import { MensagemInterface } from "./interfaces/mensagem.interface";

class Socket {

    iniciaSocket(io: SocketIO.Server): void {

        io.on('connect', socket => {
            console.log('Connected client');
  
            socket.on('entrou chat', (idUsuario: string) => {
              socket.join(idUsuario, () => console.log('usuário com id ' + idUsuario + ' entrou no chat'))
            });
  
            socket.on('mensagem', (dados: MensagemInterface) => {
              console.log('Chegou mensagem!!', dados);
              io.to(dados.remetente).emit('mensagem', dados);
              io.to(dados.destinatario).emit('mensagem', dados);
            });
  
            socket.on('saiu chat', (idUsuario: string) => {
              socket.leave(idUsuario, () => console.log('usuário com id ' + idUsuario + ' saiu do chat'))
            });
        
            socket.on("disconnect", () => {
              console.log("Client disconnected");
            });
        });
    }
}

export default new Socket();