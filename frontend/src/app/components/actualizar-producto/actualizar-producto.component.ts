import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-actualizar-producto',
  templateUrl: './actualizar-producto.component.html',
  styleUrls: ['./actualizar-producto.component.css']
})
export class ActualizarProductoComponent implements OnInit {
  producto: any = {}; // Se usa un solo obj0eto para manejar los datos
  actualizando = false; // Bandera para evitar envíos múltiples

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(id)) {
      this.productoService.getProductoById(id).subscribe(
        (data) => {
          this.producto = data; // Se llena el objeto completo con la respuesta de la API
        },
        (error) => console.error('Error al obtener el producto', error)
      );
    }
  }
  // Método para actualizar el producto con validación
  actualizarProducto(): void {
    if (this.actualizando) return; // Evita múltiples envíos
    this.actualizando = true; // Bloquea el botón mientras se actualiza

    // Validación de los campos
    if (!this.producto.nombre.trim() || 
        !this.producto.descripcion.trim() || 
        this.producto.precio <= 0 || 
        this.producto.stock < 0 || 
        !this.producto.talla.trim() || 
        !this.producto.marca.trim() || 
        this.producto.id_categoria <= 0 || 
        !this.producto.imagen.trim()) {
      alert('Todos los campos deben ser llenados correctamente.');
      this.actualizando = false; // Habilita el botón nuevamente
      return;
    }

    if (!this.producto.id_producto) {
      alert('El ID del producto no es válido.');
      this.actualizando = false;
      return;
    }

    // Realizar la actualización del producto
    this.productoService.updateProducto(this.producto.id_producto, this.producto).subscribe(
      () => {
        console.log('Producto actualizado correctamente');
        alert('Producto actualizado correctamente');
        this.router.navigate(['/principal']);
      },
      (error) => {
        console.error('Error al actualizar el producto', error);
        alert('Error al actualizar el producto. Revisa la consola.');
      }
    ).add(() => this.actualizando = false); // Habilita el botón nuevamente
  }

  // Validación y búsqueda de producto por ID
  idBuscar: number = 0;

  buscarProducto(): void {
    if (!this.idBuscar || this.idBuscar <= 0) {
      alert('Ingrese un ID válido');
      return;
    }

    this.productoService.getProductoById(this.idBuscar).subscribe(
      (data) => {
        this.producto = data;
      },
      (error) => console.error('Error al obtener el producto', error)
    );
  }
}