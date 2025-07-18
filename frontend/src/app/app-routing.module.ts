import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './components/principal/principal.component';
import { AuthGuard } from './services/guard/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { DetalleProductoComponent } from './components/detalle-producto/detalle-producto.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { MisPedidosComponent } from './components/mis-pedidos/mis-pedidos.component';
import { DetallePedidoComponent } from './components/detalle-pedido/detalle-pedido.component';
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';
import { EditarUsuarioComponent } from './components/editar-usuario/editar-usuario.component';
import { ActualizarProductoComponent } from './components/actualizar-producto/actualizar-producto.component';
import { EliminarProductoComponent } from './components/eliminar-producto/eliminar-producto.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Ruta para el login
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'editar-usuario/:id', component: EditarUsuarioComponent, canActivate: [AuthGuard] },
  { path: 'mis-pedidos', component: MisPedidosComponent, canActivate: [AuthGuard] },
  { path: 'registrar-usuario', component: RegistroUsuarioComponent},
  { path: 'pedidos/detalles/:id', component: DetallePedidoComponent, canActivate: [AuthGuard] }, 
  { path: 'crearproducto', component: CrearProductoComponent, canActivate: [AuthGuard] }, 
  { path: 'principal', component: PrincipalComponent, canActivate: [AuthGuard]},
  { path: 'detalle-producto/:id', component: DetalleProductoComponent, canActivate: [AuthGuard] },
  { path: 'carrito', component: CarritoComponent, canActivate: [AuthGuard] },
  { path: 'actualizar-producto/:id', component: ActualizarProductoComponent },
  { path: 'eliminar-producto/:id', component: EliminarProductoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
