import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  usuarios: any;
  user:any="";
  texto: string = '';
  showLogoutButton: boolean = false;
  constructor(private productoService: ProductoService, private usuarioService: UsuarioService, private authService: AuthService, private router: Router) { }
  
  ngOnInit(): void {
    this.cargarUsuario();
  }
  onCategoryChange(event: any) {
    const selectedCategory = event.target.value;
    this.productoService.changeCategory(selectedCategory); // Envia la categoría seleccionada al servicio
  }
  cambiar(event: string) {
    const selectedCategory = event;
    this.productoService.change(selectedCategory); // Envia la categoría seleccionada al servicio
  }

  cargarUsuario(): void {
    this.user = localStorage.getItem('username');
    this.usuarioService.getUsuarioById(this.user).subscribe(
      (data) => {
        this.usuarios = data;
        console.log(this.usuarios);
        localStorage.setItem('id', this.usuarios.id_usuario);
      },
      (error) => {
        console.error('Error al cargar usuarios', error);
      }
    );
  }
  // Alterna la visibilidad del botón de cerrar sesión
  toggleLogoutButton() {
    this.showLogoutButton = !this.showLogoutButton;
  }

  // Función de cerrar sesión
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  
  carrito() {
    this.router.navigate(['/carrito']);
  }

  principal() {
    this.router.navigate(['/principal']);
  }
  pedido() {
    this.router.navigate(['/mis-pedidos']);
  }
  isAdmin() {
    return this.usuarios?.rol == 'admin';
  }

  // Método para navegar al componente de creación de producto
  crearProducto() {
    if (this.isAdmin()) {
      this.router.navigate(['/crearproducto']);  // Asume que tienes una ruta configurada para "Crear Producto"
    } else {
      alert('No tienes permisos para acceder a esta página');
    }
  }
  editar(){
    this.router.navigate(['/editar-usuario', this.usuarios.id_usuario]);
  }
  actualizarProducto() {
    if (this.isAdmin()) {
      this.router.navigate(['/actualizar-producto', 1]); // Reemplaza 1 por el ID del producto real
    } else {
      alert('No tienes permisos para acceder a esta página');
    }
  }
// Nuevo método para eliminar productos
eliminarProducto(idProducto: number): void {
  if (this.isAdmin()) {
    this.router.navigate(['/eliminar-producto', idProducto]);
  } else {
    alert('No tienes permisos para eliminar productos');
  }
}
// Confirmación antes de eliminar
confirmarEliminarProducto(): void {
  if (this.isAdmin()) {
    this.router.navigate(['eliminar-producto/:id']);
  } else {
    alert('No tienes permisos para eliminar productos');
  }
}
}