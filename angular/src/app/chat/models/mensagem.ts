export interface Mensagem {
  remetente?: string;
  destinatario?: string;
  texto?: string;
  createdAt?: Date;
}

export interface MensagemChat extends Mensagem {
  isRemetente?: boolean;
}
