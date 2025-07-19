import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiAuthService = 'http://localhost:3020/login';

  constructor(private http: HttpClient) {}
  login(nombreUsuario: string, contrasenia: string): Observable<any> {
    return this.http
      .post(`${this.apiAuthService}`, { nombreUsuario, contrasenia })
      .pipe(
        tap((response: any) => {
          if (response.token) {
            const payload = JSON.parse(atob(response.token.split('.')[1]));
            localStorage.setItem('token', response.token);
            localStorage.setItem(
              'username',
              payload.nombreUsuario ? payload.nombreUsuario.toString() : null
            );
            localStorage.setItem(
              'id',
              payload.id ? payload.id.toString() : null
            );
            sessionStorage.setItem('rol', payload.rol);
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
