import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private apiUrl = 'http://localhost:3000/api/pedidos'; // Aquí va la URL de tu backend

  constructor(private http: HttpClient) {}

  // Realizar una compra
  realizarCompra(usuario_id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/realizar`, { usuario_id }, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}` // Usamos el token almacenado en el localStorage
      })
    });
  }

  // Cambiar el estado de un pedido
  cambiarEstadoPedido(p_id_pedido: number, p_nuevo_estado: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/cambiar-estado`, { p_id_pedido, p_nuevo_estado }, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    });
  }

  // Obtener detalles de un pedido
  obtenerDetallesPedido(p_id_pedido: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/detalles/${p_id_pedido}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    });
  }

  // Obtener historial de compras de un usuario
  obtenerHistorialCompras(p_id_usuario: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/historial/${p_id_usuario}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    });
  }

  // Obtener todos los pedidos
  getAllPedidos(): Observable<any> {
    return this.http.get(`${this.apiUrl}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    });
  }

  // Obtener un pedido por ID
  getPedidoById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    });
  }

  // Crear un nuevo pedido
  createPedido(id_usuario: string, total: number, fecha: string): Observable<any> {
    return this.http.post(`${this.apiUrl}`, { id_usuario, total, fecha }, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    });
  }

  // Actualizar un pedido existente
  updatePedido(id: number, id_usuario: string, total: number, fecha: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, { id_usuario, total, fecha }, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    });
  }

  // Eliminar un pedido
  deletePedido(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    });
  }
}
