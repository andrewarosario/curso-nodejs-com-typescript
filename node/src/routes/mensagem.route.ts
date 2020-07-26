import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import mensagemController from '../controllers/mensagem.controller';

const router = Router();

router.post('/:id', 
    authMiddleware.autorizarUsuarioByToken, 
    authMiddleware.autorizarUsuarioByParams, 
    mensagemController.enviar
);

router.get('/:id', 
    authMiddleware.autorizarUsuarioByToken, 
    authMiddleware.autorizarUsuarioByParams, 
    mensagemController.listar
);

export default router;

