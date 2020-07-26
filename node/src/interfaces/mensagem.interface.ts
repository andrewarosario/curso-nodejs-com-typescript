export interface MensagemInterface {
    remetente?: string;
    destinatario?: string;
    texto?: string;
    createdAt?: Date;
}

export interface MensagemChat extends MensagemInterface{
    isRemetente: boolean;
}