import { Request, Response } from "express";
import Usuario from '../models/usuario.model';
import Mensagem from '../models/mensagem.model';
import mensagemService from "../services/mensagem.service";

class UsuarioController {

    public async listar(req: Request, res: Response): Promise<Response> {
        const idUsuarioLogado = req.usuario._id;

        const usuarios = await Usuario.buscaTodosChat(idUsuarioLogado);

        const usuariosMsg = await Promise.all(usuarios.map(usuario => {
               
            return Mensagem.buscaChat(idUsuarioLogado, usuario._id)
                .sort('-createdAt')
                .limit(1)
                .map(mensagens => mensagemService.getResultadoMensagemUsuario(mensagens, usuario));
        }));

        const mensagensOrdenadas = mensagemService.retornaMensagensOrdenadas(usuariosMsg);

        return res.json(mensagensOrdenadas);
    }  

    public async cadastrar(req: Request, res: Response): Promise<Response> {
        const usuario = await Usuario.create(req.body);
        return res.json(usuario);
    }

    public async autenticar(req: Request, res: Response): Promise<Response> {

        const { nome, senha } = req.body;

        const usuario = await Usuario.findOne({ nome });

        if (!usuario) {
            return res.status(400).send({ message: 'Usuário não encontrado!'});
        }

        if (!(await usuario.compareHash(senha))) {
            return res.status(400).json({ message: 'Senha inválida!' });
        }

        return res.json({
            usuario,
            token: usuario.generateToken()
        });
    }

    public getById(req: Request, res: Response): Response {
        return res.json(req.usuarioChat);
    }  
}

export default new UsuarioController();