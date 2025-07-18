import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { UsuarioService } from '../../services/usuario.service';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  carrito: any[] = [];
  id_usuario!: number;
  user: any = "";

  constructor(private pedidoService: PedidoService, private carritoService: CarritoService, private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.cargarUsuario();
  }

  cargarUsuario(): void {
    this.user = localStorage.getItem('username');
    this.usuarioService.getUsuarioById(this.user).subscribe(
      (data) => {
        this.id_usuario = data.id_usuario;
        this.obtenerCarrito(); // Llamar al carrito después de obtener el usuario
        console.log(this.id_usuario);
      },
      (error) => {
        console.error('Error al obtener usuario', error);
      }
    );
  }

  obtenerCarrito(): void {
    this.carritoService.obtenerCarrito(this.id_usuario).subscribe(
      (data) => {
        this.carrito = data;
        console.log("Carrito cargado:", this.carrito);
      },
      (error) => {
        console.error('Error al obtener carrito', error);
      }
    );
  }

  eliminarProducto(id_producto: number): void {
    this.carritoService.eliminarProductoCarrito(id_producto).subscribe(
      () => {
        this.carrito = this.carrito.filter(item => item.id_producto !== id_producto);
      },
      (error) => {
        console.error('Error al eliminar producto del carrito', error);
      }
    );
  }

  vaciarCarrito(): void {
    this.carritoService.vaciarCarrito(this.id_usuario).subscribe(
      () => {
        this.carrito = [];
      },
      (error) => {
        console.error('Error al vaciar carrito', error);
      }
    );
  }
  realizarPedido(): void {
    // Llamar al servicio para realizar la compra
    this.pedidoService.realizarCompra(this.id_usuario).subscribe(
      (response) => {
        console.log('Compra realizada con éxito', response);
        this.vaciarCarrito();  // Vaciar el carrito después de realizar la compra
      },
      (error) => {
        console.error('Error al realizar la compra', error);
      }
    );
  }
}
