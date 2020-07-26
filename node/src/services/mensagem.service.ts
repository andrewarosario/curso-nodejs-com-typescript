import { MensagemChat, MensagemInterface } from "../interfaces/mensagem.interface";
import { UsuarioInterface, UsuarioMensagem } from "../interfaces/usuario.interface";

class MensagemService {

    public getResultadoMensagensChat(mensagens: MensagemInterface[], idUsuario: string): MensagemChat[] {

        return mensagens.map(mensagem => ({
            texto: mensagem.texto, 
            createdAt: mensagem.createdAt,
            isRemetente: mensagem.remetente == String(idUsuario)
        }));
    };

    public getResultadoMensagemUsuario(mensagens: MensagemInterface[], usuario: UsuarioInterface): UsuarioMensagem {
        
        return {
            _id: usuario._id,
            nome: usuario.nome,
            avatar: usuario.avatar,
            ultimaMensagem: mensagens[0] ? mensagens[0].texto : null,
            dataUltimaMensagem: mensagens[0] ? mensagens[0].createdAt : null,
       };
    }

    public retornaMensagensOrdenadas(usuariosMensagem: UsuarioMensagem[]): UsuarioMensagem[] {

        return usuariosMensagem.sort((a, b) => {
            return (a.dataUltimaMensagem ? 0 : 1) - (b.dataUltimaMensagem ? 0 : 1) 
                || -(a.dataUltimaMensagem > b.dataUltimaMensagem)
                || +(a.dataUltimaMensagem < b.dataUltimaMensagem);
        });
    };
}

export default new MensagemService();