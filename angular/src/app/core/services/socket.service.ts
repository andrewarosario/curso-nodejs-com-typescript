import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { MensagemChat } from 'src/app/chat/models/mensagem';

const API = environment.api;

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: SocketIOClient.Socket;

  constructor() {
    this.socket = socketIo(API);
  }

  public entrarChat(idUsuario: string) {
    this.socket.emit('entrou chat', idUsuario);
  }

  public sairChat(idUsuario: string): void {
    this.socket.emit('saiu chat', idUsuario);
  }

  public enviarMensagem(mensagem: MensagemChat): void {
    this.socket.emit('mensagem', mensagem);
}

  public recebimentoMensagem(): Observable<MensagemChat> {
    return new Observable<MensagemChat>(observer => {
        this.socket.on('mensagem', (data: MensagemChat) => observer.next(data));
    });
  }

}
