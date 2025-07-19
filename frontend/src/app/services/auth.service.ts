import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth'; // Ajusta la URL según tu backend
    private apiAuthService = 'http://localhost:3020/login'; 

  constructor(private http: HttpClient) {}
  login(nombreUsuario: string, contrasenia: string): Observable<any> {
    return this.http.post(`${this.apiAuthService}`, { nombreUsuario, contrasenia }).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('username', nombreUsuario);
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