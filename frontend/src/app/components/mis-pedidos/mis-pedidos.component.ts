import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../services/pedido.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mis-pedidos',
  templateUrl: './mis-pedidos.component.html',
  styleUrls: ['./mis-pedidos.component.css']
})
export class MisPedidosComponent implements OnInit {
  pedidos: any[] = []; // Lista para almacenar los pedidos
  loading: boolean = true;

  constructor(private pedidoService: PedidoService, private router: Router) { }

  ngOnInit(): void {
    this.obtenerPedidos();
  }

  obtenerPedidos(): void {
    const userId = Number(localStorage.getItem('id')); 
    this.pedidoService.obtenerHistorialCompras(userId).subscribe(
      (data: any) => {
        this.pedidos = data;
        this.loading = false;
      },
      error => {
        console.error("Error al obtener los pedidos", error);
        this.loading = false;
      }
    );
  }

  verDetalles(idPedido: number): void {
    this.router.navigate([`/pedidos/detalles/${idPedido}`]);
  }
}
