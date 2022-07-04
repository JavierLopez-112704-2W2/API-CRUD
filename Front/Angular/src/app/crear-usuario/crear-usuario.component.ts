import { Component, OnInit } from '@angular/core';
import { Usuario } from '../Interfaces/Usuario';
import { UsuarioProvider } from '../../Providers/UsuarioProvider';
import { Router } from  '@angular/router';


@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  usuarioNuevo = {} as Usuario;

  listaRoles: any = [];

  constructor(private usuarioApi: UsuarioProvider, private router:Router) {
    this.cargarComboRoles();
    this.usuarioNuevo.tipo = "Seleccione";
   }

  ngOnInit(): void {
  }

  //----------------------------------------------------------------
  async enviarUsuario() {
    
    if([this.usuarioNuevo.nombre, this.usuarioNuevo.password].includes("",) || this.usuarioNuevo.tipo==null) {
      alert("Error de validación, todos los campos son obligatorios");
      return
    }
    else{
      this.usuarioApi.createUsuario(this.usuarioNuevo.nombre, this.usuarioNuevo.password, this.usuarioNuevo.tipo).subscribe((data) => { 
        
        if(data.ok){
          alert("Creación de Usuario exitosa");
          this.router.navigateByUrl('/crearusuario');
        }
        else{
          alert(data.error);
          
        }
  
      });
    }
    
  }
  //----------------------------------------------------------------
  async cargarComboRoles(){

    this.usuarioApi.getRoles().subscribe((data) => {
      if(data.ok){
        this.listaRoles = data.listaRoles;
        console.log(this.listaRoles)
      }
      else{ 
        alert(data.error);
      }
    });
  }

}
