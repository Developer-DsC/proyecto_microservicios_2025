import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent {
  registroForm: FormGroup;
  mensaje: string = '';

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private fb: FormBuilder
  ) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contrasena: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&.])[A-Za-z\\d@$!%*?&.]{8,}$')
        ]
      ]
      
    });
  }

  get nombre() {
    return this.registroForm.get('nombre');
  }

  get email() {
    return this.registroForm.get('email');
  }

  get contrasena() {
    return this.registroForm.get('contrasena');
  }

  registrarUsuario(): void {
    if (this.registroForm.valid) {
      const { nombre, email, contrasena } = this.registroForm.value;
      const rol = 'usuario'; // 🔒 Asignar siempre el rol 'usuario'
      this.usuarioService.createUsuario(nombre, email, contrasena, rol).subscribe(
        response => {
          this.mensaje = 'Usuario registrado con éxito';
          this.registroForm.reset();
          this.router.navigate(['/login']);
        },
        error => {
          this.mensaje = 'Error al registrar el usuario';
          console.error(error);
        }
      );
    } else {
      this.mensaje = 'Por favor, complete todos los campos correctamente.';
    }
  }

  cancelar() {
    this.router.navigate(['/login']);
  }
}
