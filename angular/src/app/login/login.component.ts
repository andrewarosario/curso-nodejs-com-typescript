import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public isLogin = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.criarForm();
  }

  criarForm(): void {
    this.loginForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {

    this.isLogin
      ? this.logar()
      : this.cadastrar();
  }

  toggleLogin(): void {
    this.isLogin = !this.isLogin;
  }

  get nome() {
    return this.loginForm.get('nome');
  }

  get senha() {
    return this.loginForm.get('senha');
  }

  private logar() {
    this.authService.autenticar(this.loginForm.value)
    .subscribe(
        res => this.router.navigate(['/chat']),
        err => {
          console.log(err);
          this.snackBar.open(err.error.message, 'Ok', { duration: 3000 });
        }
    );
  }

  private cadastrar() {
    this.authService.cadastrar(this.loginForm.value)
    .subscribe(
      res => {
        this.snackBar.open('Cadastro realizado com sucesso! Efetue o login.', 'Ok', { duration: 3000 });
        this.toggleLogin();
      },
      err => console.log(err)
    );
  }

}
