import { Router } from 'express';
import usuarioController from '../controllers/usuario.controller';
import authMiddleware from '../middlewares/auth.middleware';

const router = Router();
router.get('/', authMiddleware.autorizarUsuarioByToken, usuarioController.listar);
router.get('/:id', authMiddleware.autorizarUsuarioByParams, usuarioController.getById);
router.post('/cadastro', usuarioController.cadastrar);
router.post('/login', usuarioController.autenticar);

export default router;

