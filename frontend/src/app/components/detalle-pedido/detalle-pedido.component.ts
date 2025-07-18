import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../services/pedido.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.css']
})
export class DetallePedidoComponent implements OnInit {
  detallesPedido: any[] = [];
  loading: boolean = true;
  idPedido: number=0;
  nuevoEstado: string = 'pendiente'; // Estado predeterminado

  constructor(
    private pedidoService: PedidoService,
    private route: ActivatedRoute,
    private router: Router  // Añadido para la navegación
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idPedido = +params['id']; // Obtener el ID del pedido desde la URL
      this.obtenerDetallesPedido(this.idPedido);
    });
  }

  obtenerDetallesPedido(idPedido: number): void {
    this.pedidoService.obtenerDetallesPedido(idPedido).subscribe(
      (data: any) => {
        this.detallesPedido = data;
        this.loading = false;
      },
      error => {
        console.error('Error al obtener los detalles del pedido', error);
        this.loading = false;
      }
    );
  }

  // Método para cambiar el estado del pedido
  cambiarEstado(): void {
    if (this.nuevoEstado) {
      this.pedidoService.cambiarEstadoPedido(this.idPedido, this.nuevoEstado).subscribe(
        (response) => {
          console.log('Estado del pedido actualizado:', response);
          alert('Estado del pedido actualizado');
        },
        (error) => {
          console.error('Error al cambiar el estado del pedido', error);
          alert('Hubo un error al cambiar el estado del pedido');
        }
      );
    }
  }

  // Método para volver a la página de pedidos
  volver(): void {
    this.router.navigate(['/mis-pedidos']);  // Redirige a la página de "Mis Pedidos"
  }
}
