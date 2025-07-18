import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:3000/api'; // Ajusta la URL si es necesario

  constructor(private http: HttpClient) { }

  // Función para obtener los encabezados con el token
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Obtener token del LocalStorage
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Registrar un nuevo usuario
  registrarUsuario(nombre: string, email: string, contrasena: string, rol: string): Observable<any> {
    const body = { nombre, email, contrasena, rol };
    return this.http.post(`${this.apiUrl}/usuarios/registro`, body, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener todos los usuarios
  getAllUsuarios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuarios`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener un usuario por ID
  getUsuarioById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuarios/${id}`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Crear un nuevo usuario
  createUsuario(nombre: string, email: string, contrasena: string, rol: string): Observable<any> {
    const body = { nombre, email, contrasena, rol };
    return this.http.post(`${this.apiUrl}/usuarios`, body, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Actualizar un usuario
  updateUsuario(id: string, nombre: string, email: string, contrasena: string, rol: string): Observable<any> {
    const body = { nombre, email, contrasena, rol };
    return this.http.put(`${this.apiUrl}/usuarios/${id}`, body, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Eliminar un usuario
  deleteUsuario(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/usuarios/${id}`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Manejo de errores
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ha ocurrido un error desconocido';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Código de error: ${error.status}, ` + `Mensaje: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
