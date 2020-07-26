import jwt from 'jsonwebtoken';
import config from '../config';
import { Request, Response, NextFunction } from 'express';
import { UsuarioInterface } from '../interfaces/usuario.interface';
import authService from '../services/auth.service'
import usuarioModel from '../models/usuario.model';

class AuthMiddleware {

    public async autorizarUsuarioByToken(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
        const token = authService.retornaTokenHeader(req);

        if (!token) {
            return res.status(401).json({ mensagem: 'Acesso Restrito' });
        }

        try {
            const usuarioToken = jwt.verify(token, config.SALT_KEY) as UsuarioInterface;
            const usuario = await usuarioModel.findById(usuarioToken._id);

            if (!usuario) {
                return res.status(400).send({ message: 'Usuário não encontrado!'});
            }

            req.usuario = usuario;
            return next();
        } catch (error) {
            return res.status(401).json({ mensagem: 'Token inválido' });
        }
    }

    public async autorizarUsuarioByParams(req: Request, res: Response, next: NextFunction): Promise<void | Response> {

        try {
            const usuario = await usuarioModel.findById(req.params.id);
            if (!usuario) {
                return res.status(400).send({ message: 'Usuário não encontrado!'});
            }
            req.usuarioChat = usuario;
            return next();
        } catch (error) {
            return res.status(400).send({ message: 'Id do usuário inválido!'});
        }
        
    }
}

export default new AuthMiddleware();