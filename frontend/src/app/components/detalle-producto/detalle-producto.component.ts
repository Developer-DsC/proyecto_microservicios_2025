import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { CarritoService } from '../../services/carrito.service';  // Asegúrate de importar el servicio Carrito
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {
  producto: any;
  cantidadSeleccionada: number = 1; // Valor inicial
  cantidadOpciones: number[] = [];
  usuarios: any;
  id_usuario = 1;  // Cambia esto según la lógica para obtener el ID del usuario logueado
  user:any="";
  botonTexto: string = 'Añadir al carrito';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService,
    private carritoService: CarritoService, // Inyectamos el servicio Carrito
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productoService.getProductoById(id).subscribe(data => {
      this.producto = {
        ...data,
        imagen: data.imagen.startsWith('http') ? data.imagen : `../assets/imagenes/${data.imagen}`
      };
      
      // Una vez que el producto se ha cargado, se asignan las opciones de cantidad
      this.cantidadOpciones = Array.from({ length: this.producto.stock }, (_, i) => i + 1);
    });
    this.cargarUsuario();
  }
  cargarUsuario(): void {
    this.user = localStorage.getItem('username');
    this.usuarioService.getUsuarioById(this.user).subscribe(
      (data) => {
        this.usuarios = data;
        console.log(this.usuarios);
      },
      (error) => {
        console.error('Error al cargar usuarios', error);
      }
    );
    this.id_usuario = Number(localStorage.getItem('id'));
  }
  // Método para agregar el producto al carrito usando el servicio
  agregarAlCarrito(): void {
    // Llamada al servicio de carrito para agregar el producto al carrito
    this.carritoService.agregarAlCarrito(this.id_usuario, this.producto.id_producto, this.cantidadSeleccionada).subscribe(
      response => {
        alert(`Producto: ${this.producto.nombre}, Cantidad: ${this.cantidadSeleccionada} agregado al carrito.`);
      },
      error => {
        console.error('Error al agregar al carrito:', error);
        alert('Hubo un problema al agregar el producto al carrito. Intenta nuevamente.');
      }
    );
    this.botonTexto = "Ver carrito";
  }
  
  verCarrito(): void {
    this.router.navigate(['/carrito']);  // Redirige a la página del carrito
  }

  volver() {
    this.router.navigate(['/principal']); // Cambia la ruta a donde desees redirigir
  }
}
