import { Component, OnInit } from '@angular/core';
import { Usuario } from '../Interfaces/Usuario';
import { Router } from '@angular/router';
import { UsuarioProvider } from 'src/Providers/UsuarioProvider';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = {} as Usuario;



  constructor(private router: Router, private usuarioApi: UsuarioProvider) { }

  ngOnInit(): void {
  }
  //------------------------------------------------------
  login(): void {
    if([this.usuario.nombre, this.usuario.password].includes("")) {
      alert("Error de Validación, todos los campos son obligatorios")
    }
    else{
      this.usuarioApi.postLogin(this.usuario.nombre, this.usuario.password).subscribe((data) => { 
        if(data.ok){
          this.router.navigateByUrl("/listas");
          //alert("Bienvenido");
        }
        else{
          alert(data.error);
        }
  
      });

    }



  }
  //------------------------------------------------------this.router.navigate(['login']);
  create(): void {
    this.router.navigate(['crearusuario']);
    //this.router.navigateByUrl('/crearusuario');
  }

  

}
