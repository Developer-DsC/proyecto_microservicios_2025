import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoService } from '../../services/producto.service';
import { catchError, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent {
  nombre: string = '';
  descripcion: string = '';
  precio: number = 0;
  stock: number = 0;
  talla: string = '';
  marca: string = '';
  id_categoria: number = 1;
  imagen: string = '';

  constructor(private productoService: ProductoService, private router: Router) {}

  // Función para enviar el formulario al backend
  onSubmit(): void {
    if (!this.nombre.trim() || !this.descripcion.trim() || this.precio <= 0 || this.stock < 0 ||
    !this.talla.trim() || !this.marca.trim() || this.id_categoria <= 0 || !this.imagen.trim()) {
  alert('Todos los campos deben ser llenados correctamente.');
  return;
}
    const producto = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      precio: this.precio,
      stock: this.stock,
      talla: this.talla,
      marca: this.marca,
      id_categoria: this.id_categoria,
      imagen: this.imagen
    };

    // Usar el servicio para crear el producto
    this.productoService.createProducto(producto).subscribe(
      response => {
        console.log('Producto creado', response);
        this.router.navigate([`/principal`]);
      },
      error => {
        console.error('Error al crear el producto', error);
      }
    );
  }
}
