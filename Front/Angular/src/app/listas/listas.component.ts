import { Component, OnInit } from '@angular/core';
import { PersonaProvider } from '../../Providers/PersonaProvider';
import { Router } from  '@angular/router';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.css']
})
export class ListasComponent implements OnInit {

  listaPersonas: any = [];

  constructor(private personaApi: PersonaProvider, private router:Router) {
     this.ObtenerPersonas();
   }

  ngOnInit(): void {
  }


  //--------------------------------------------------------------------------
  async EditarPersona(id:string) {
    this.router.navigateByUrl("/editar/" + id);
    console.log(id);
  }
  //--------------------------------------------------------------------------
  async ObtenerPersonas(){
    this.personaApi.getPersonas().subscribe((data) => {
      if(data.ok){
        this.listaPersonas = data.listaPersonas;
        console.log(this.listaPersonas);
      }
      else{
        alert(data.error);
      }
    });
  }
  //--------------------------------------------------------------------------
  async EliminarPersona(id:string){
    this.personaApi.deletePersona(id).subscribe((data) =>{
      if(data){
        alert("Persona eliminada")
        this.router.navigateByUrl("/listas");
      }
      else{
        alert(data);
      }
    });
  }
  //--------------------------------------------------------------------------
  async AgregarPersona(){
    this.router.navigateByUrl("/crearpersona");
  }
  //--------------------------------------------------------------------------
}
