import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { PrincipalComponent } from './components/principal/principal.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductoComponent } from './components/producto/producto.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DetalleProductoComponent } from './components/detalle-producto/detalle-producto.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { MisPedidosComponent } from './components/mis-pedidos/mis-pedidos.component';
import { DetallePedidoComponent } from './components/detalle-pedido/detalle-pedido.component';
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditarUsuarioComponent } from './components/editar-usuario/editar-usuario.component';
import { ActualizarProductoComponent } from './components/actualizar-producto/actualizar-producto.component';
import { EliminarProductoComponent } from './components/eliminar-producto/eliminar-producto.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PrincipalComponent,
    ProductoComponent,
    NavbarComponent,
    DetalleProductoComponent,
    CarritoComponent,
    MisPedidosComponent,
    DetallePedidoComponent,
    CrearProductoComponent,
    RegistroUsuarioComponent,
    EditarUsuarioComponent,
    ActualizarProductoComponent,
    EliminarProductoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,  
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
