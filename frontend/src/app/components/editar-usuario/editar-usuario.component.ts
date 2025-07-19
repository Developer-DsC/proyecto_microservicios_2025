import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {
  esAdmin: boolean = false;
  usuarioId: string =  '';
  editForm: FormGroup;
  user: any='';

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contrasena: [
  '',
  [
    Validators.required,
    Validators.minLength(6),
    Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/)
  ]
],

      rol: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  
  this.usuarioId = localStorage.getItem('id') ?? '';
  this.user  = localStorage.getItem('username');

  this.usuarioService.getUsuarioById(this.user).subscribe(usuario => {
    this.esAdmin = usuario.rol === 'admin'; // ✅ solo el admin puede ver y editar rol

    this.editForm.patchValue({
      nombre: usuario.nombre,
      email: usuario.email,
      contrasena: '', // nunca mostrar contraseña real
      rol: usuario.rol
    });

    if (!this.esAdmin) {
      this.editForm.get('rol')?.disable(); // 🔒 usuarios comunes no pueden editar el rol
    }
  });
}


 actualizarUsuario(): void {
  if (this.editForm.valid) {
    const { nombre, email, contrasena } = this.editForm.value;

    // Asegura que siempre se envíe un rol válido
    const rol = this.esAdmin ? this.editForm.get('rol')?.value : 'usuario';

    this.usuarioService.updateUsuario(this.usuarioId, nombre, email, contrasena, rol).subscribe(
      response => {
        alert('Usuario actualizado con éxito');
      },
      error => {
        console.error('Error al actualizar usuario', error);
        alert(`Error al actualizar usuario Código de error: ${error.status}, Mensaje: ${error.message}`);
      }
    );
  }
}
}
