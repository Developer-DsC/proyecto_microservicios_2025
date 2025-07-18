import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'http://localhost:3000/api'; // Ajusta la URL según tu backend
  private categorySource = new BehaviorSubject<string>(''); // Valor por defecto
  currentCategory = this.categorySource.asObservable(); // Observable que los otros componentes pueden suscribirse
  
  private busqueda = new BehaviorSubject<string>(''); // Valor por defecto
  abusqueda = this.busqueda.asObservable(); 
  
  constructor(private http: HttpClient) { }
  changeCategory(category: string) {
    this.categorySource.next(category);
  }
  change(busqueda: string) {
    this.busqueda.next(busqueda);
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Obtener token del LocalStorage
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Obtener todos los productos
  getAllProductos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/productos`, { headers: this.getHeaders() });
  }

  // Obtener un producto por ID
  getProductoById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/productos/${id}`, { headers: this.getHeaders() });
  }

  // Crear un nuevo producto
  createProducto(producto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/productos`, producto, { headers: this.getHeaders() });
  }

  // Actualizar un producto
  updateProducto(id: number, producto: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/productos/${id}`, producto, { headers: this.getHeaders() });
  }
  
  // Eliminar un producto
  deleteProducto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/productos/${id}`, { headers: this.getHeaders() });
  }

  // Obtener productos por categoría
  getProductosByCategoria(id_categoria_p: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/productos/categoria/${id_categoria_p}`, { headers: this.getHeaders() });
  }
}
