import { UsuarioInterface } from "./interfaces/usuario.interface";

declare global {
    namespace Express {
      interface Request {
        usuario?: UsuarioInterface,
        usuarioChat?: UsuarioInterface
      }
    }
}