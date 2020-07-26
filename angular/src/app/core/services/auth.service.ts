import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { environment } from 'src/environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { UsuarioService } from './usuario.service';
import { of } from 'rxjs';

const API = environment.api;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService
  ) { }

  cadastrar(usuario: Usuario) {
    return this.http.post<Usuario>(API + 'usuarios/cadastro', usuario);
  }

  autenticar(usuario: Usuario) {

    return this.http
      .post<Usuario>(
        API + 'usuarios/login',
        usuario,
      )
      .pipe(
        tap((res: any) => {
          const authToken = res.token;
          this.usuarioService.setToken(authToken);
          console.log(`Usuário autenticado com o token ${authToken}`);
        })
      );
  }
}
