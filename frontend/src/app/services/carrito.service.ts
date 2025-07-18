import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private apiUrl = 'http://localhost:3000/api/carrito';  // Ajusta esta URL a la correcta para tu backend

  constructor(private http: HttpClient) {}

  // Método para obtener las cabeceras con el token
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');  // Obtener token del LocalStorage
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Método para agregar un producto al carrito
  agregarAlCarrito(id_usuario: number, id_producto: number, cantidad: number): Observable<any> {
    const url = `${this.apiUrl}/agregar`;
    const body = { id_usuario, id_producto, cantidad };
    return this.http.post(url, body, { headers: this.getHeaders() });  // Incluir las cabeceras
  }

  // Método para eliminar un producto del carrito
  eliminarProductoCarrito(id_usuario: number): Observable<any> {
    const url = `${this.apiUrl}/${id_usuario}`;
    return this.http.delete(url, { headers: this.getHeaders() });  // Incluir las cabeceras
  }
  
  verificarProductoEnCarrito(id_producto: number, id_usuario:number): Observable<boolean> {
    // Aquí puedes hacer una consulta a tu API para verificar si el producto está en el carrito
    return this.http.get<boolean>(`${this.apiUrl}/producto-existe/${id_producto}/${id_usuario}`, { headers: this.getHeaders() });
  }

  // Método para vaciar el carrito
  vaciarCarrito(id_usuario: number): Observable<any> {
    const url = `${this.apiUrl}/vaciar/${id_usuario}`;
    return this.http.delete(url, { headers: this.getHeaders() });  // Incluir las cabeceras
  }

  // Método para obtener el carrito de un usuario
  obtenerCarrito(p_id_usuario: number): Observable<any> {
    const url = `${this.apiUrl}/usuario/${p_id_usuario}`;
    return this.http.get(url, { headers: this.getHeaders() });  // Incluir las cabeceras
  }

  // Método para obtener todos los carritos (por ejemplo, para administración)
  getAllCarrito(): Observable<any> {
    const url = `${this.apiUrl}`;
    return this.http.get(url, { headers: this.getHeaders() });  // Incluir las cabeceras
  }

  // Método para obtener un carrito por ID
  getCarritoById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get(url, { headers: this.getHeaders() });  // Incluir las cabeceras
  }

  // Método para crear un carrito (si no existe)
  createCarrito(id_usuario: number, id_producto: number, cantidad: number): Observable<any> {
    const url = `${this.apiUrl}`;
    const body = { id_usuario, id_producto, cantidad };
    return this.http.post(url, body, { headers: this.getHeaders() });  // Incluir las cabeceras
  }

  // Método para actualizar un carrito
  updateCarrito(id: number, id_usuario: number, id_producto: number, cantidad: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    const body = { id_usuario, id_producto, cantidad };
    return this.http.put(url, body, { headers: this.getHeaders() });  // Incluir las cabeceras
  }

  // Método para eliminar un carrito
  deleteCarrito(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url, { headers: this.getHeaders() });  // Incluir las cabeceras
  }
}
