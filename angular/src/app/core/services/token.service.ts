import { Injectable } from '@angular/core';

const LOCAL_STORAGE_KEY = 'access-token';

@Injectable({ providedIn: 'root' })
export class TokenService {

  possuiToken(): boolean {
    return !!this.getToken();
  }

  setToken(token): void {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, token);
  }

  getToken(): string {
    return window.localStorage.getItem(LOCAL_STORAGE_KEY);
  }

  removerToken(): void {
    window.localStorage.removeItem(LOCAL_STORAGE_KEY);
  }
}
