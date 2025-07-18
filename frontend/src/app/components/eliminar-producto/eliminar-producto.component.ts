import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-eliminar-producto',
  templateUrl: './eliminar-producto.component.html',
  styleUrls: ['./eliminar-producto.component.css']
})
export class EliminarProductoComponent implements OnInit {
  producto: any = null; // Ahora manejamos un objeto, no solo un número
  eliminando = false;
  idBuscar: number = 0; // Para la búsqueda

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(id)) {
      this.buscarProductoPorId(id);
    }
  }

  buscarProducto(): void {
    if (!this.idBuscar || this.idBuscar <= 0) {
      alert('Ingrese un ID válido');
      return;
    }
    this.buscarProductoPorId(this.idBuscar);
  }

  buscarProductoPorId(id: number): void {
    this.productoService.getProductoById(id).subscribe(
      (data) => {
        this.producto = data; // Guardamos el producto completo
      },
      (error) => {
        console.error('Error al obtener el producto', error);
        alert('Producto no encontrado.');
        this.producto = null; // Limpiamos el producto si hay error
      }
    );
  }

  eliminarProducto(): void {
    if (!this.producto || !this.producto.id_producto) {
      alert('No hay un producto seleccionado para eliminar.');
      return;
    }
  
    const confirmacion = confirm(`¿Seguro que quieres eliminar "${this.producto.nombre}"?`);
    if (!confirmacion) return;
  
    if (this.eliminando) return;
    this.eliminando = true;
  
    this.productoService.deleteProducto(this.producto.id_producto).subscribe(
      () => {
        alert('Producto eliminado correctamente');
        this.router.navigate(['/principal']);
      },
      (error) => {
        console.error('Error al eliminar el producto', error);
        alert('Error al eliminar el producto.');
      }
    ).add(() => this.eliminando = false);
  } 
}
