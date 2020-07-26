import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from './token.service';
import { Usuario } from '../models/usuario';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuarioSubject$ = new BehaviorSubject<Usuario>(null);
  public usuario$ = this.usuarioSubject$.asObservable();

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private socketService: SocketService,
  ) {

    if (this.tokenService.possuiToken()) {
      this.atualizaUsuario();
    }
  }

  setToken(token: string) {
    this.tokenService.setToken(token);
    this.atualizaUsuario();
  }

  get usuario() {
    return this.usuarioSubject$.getValue();
  }

  private atualizaUsuario() {
    const token = this.tokenService.getToken();

    const usuario = jwt_decode(token) as Usuario;
    if (usuario) {
      this.usuarioSubject$.next(usuario);
      this.socketService.entrarChat(usuario._id);
    }
  }

  logout() {
    this.socketService.sairChat(this.usuario._id);
    this.tokenService.removerToken();
    this.usuarioSubject$.next(null);
    this.router.navigate(['/login']);
  }

  isLogado() {
    return this.tokenService.possuiToken();
  }

}
