import { Component, OnInit } from '@angular/core'; 
import { ProductoService } from '../../services/producto.service';
import { Router } from '@angular/router';
import { CarritoService } from '../../services/carrito.service'; // Asegúrate de importar tu servicio de carrito

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  productos: any[] = [];
  selectedCategory: string = '';
  id: number = 0;
  busqueda: string = '';
  productosEnCarrito: Set<number> = new Set(); // Usaremos un Set para almacenar los IDs de los productos en el carrito

  constructor(
    private router: Router, 
    private productoService: ProductoService,
    private carritoService: CarritoService // Inyecta el servicio de carrito
  ) { }

  ngOnInit(): void {
    this.obtenerProductos();  

    this.productoService.currentCategory.subscribe(category => {
      this.selectedCategory = category;
      this.obtenerProductos();  // Vuelve a obtener los productos al cambiar la categoría
    });

    this.productoService.abusqueda.subscribe(category => {
      this.busqueda = category;
      this.productoService.getAllProductos().subscribe(
        (data: any[]) => {
          this.productos = data.map((producto: any) => ({
            ...producto,
            // Verificamos si la imagen es una URL completa (comienza con http)
            imagen: producto.imagen.startsWith('http') ? producto.imagen : `../assets/imagenes/${producto.imagen}`
          }));
    
          this.productos = this.productos.filter(producto =>
            producto.nombre.toLowerCase().includes(category.toLowerCase())
          );
          this.cargarProductosEnCarrito(); // Verificamos los productos en el carrito al cargar los productos
        },
        error => {
          console.error('Error al obtener productos:', error);
        }
      );
    });
    
  }
  // Verifica si el producto ya está en el carrito
  cargarProductosEnCarrito(): void {
    this.productos.forEach(producto => {
      this.carritoService.verificarProductoEnCarrito(producto.id_producto, Number(localStorage.getItem('id'))).subscribe(existe => {
        if (existe) {
          this.productosEnCarrito.add(producto.id_producto); // Agregar el producto al Set si existe en el carrito
        }
      });
    });
  }

  comprarProducto(id: number): void {
    if (this.productosEnCarrito.has(id)) {
      // Si ya está en el carrito, redirigir al carrito
      this.router.navigate(['/carrito']);
    } else {
      // Si no está en el carrito, redirigir a la página de detalles
      this.router.navigate(['/detalle-producto', id]);
    }
  }

  obtenerProductos(): void {
    if (this.selectedCategory == '' || this.selectedCategory == "Todas las categorías" && this.busqueda == '') {
      this.productoService.getAllProductos().subscribe(
        (data: any[]) => {
          this.productos = data.map((producto: any) => ({
            ...producto,
            imagen: producto.imagen.startsWith('http') ? producto.imagen : `../assets/imagenes/${producto.imagen}`
          }));
        },
        error => {
          console.error('Error al obtener productos:', error);
        }
      );
    } else if (this.busqueda == '') {
      if (this.selectedCategory == 'Hombre') {
        this.id = 1;
      }
      if (this.selectedCategory == 'Mujer') {
        this.id = 2;
      }
      if (this.selectedCategory == 'Niños') {
        this.id = 3;
      }
      this.productoService.getProductosByCategoria(this.id).subscribe(
        (data: any[]) => {
          this.productos = data.map((producto: any) => ({
            ...producto,
            imagen: producto.imagen.startsWith('http') ? producto.imagen : `../assets/imagenes/${producto.imagen}`
          }));
        },
        error => {
          console.error('Error al obtener productos:', error);
        }
      );
    }
  }
}
