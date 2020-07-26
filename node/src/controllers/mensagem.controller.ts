import { Request, Response } from "express";
import Mensagem from '../models/mensagem.model';
import mensagemService from "../services/mensagem.service";

class MensagemController {

    public async enviar(req: Request, res: Response): Promise<Response> {

        const mensagem = await Mensagem.create({
            remetente: req.usuario,
            destinatario: req.usuarioChat,
            texto: req.body.texto
        });

        return res.json(mensagem);
    }

    public async listar(req: Request, res: Response): Promise<Response> {

        const idUsuarioLogado = req.usuario._id;
        const idUsuarioChat = req.usuarioChat._id;
        const mensagens = await Mensagem.buscaChat(idUsuarioLogado, idUsuarioChat).sort('createdAt');

        const mensagensChat = mensagemService.getResultadoMensagensChat(mensagens, idUsuarioLogado);

        return res.json(mensagensChat);
    }
}

export default new MensagemController();