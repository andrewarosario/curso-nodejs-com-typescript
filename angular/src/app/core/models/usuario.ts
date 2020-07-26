export interface Usuario {
  _id?: any;
  nome: string;
  senha?: string;
  avatar?: string;
}

export interface UsuarioMensagem extends Usuario {
  ultimaMensagem: string;
  dataUltimaMensagem: Date;
}
