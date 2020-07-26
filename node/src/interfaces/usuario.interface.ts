export interface UsuarioInterface {
    _id: string | any;
    nome?: string;
    senha?: string;
    avatar?: string;
}

export interface UsuarioMensagem extends UsuarioInterface {
    ultimaMensagem: string;
    dataUltimaMensagem: Date;
}