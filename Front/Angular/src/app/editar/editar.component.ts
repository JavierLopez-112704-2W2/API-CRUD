import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonaProvider } from 'src/Providers/PersonaProvider';
import { Persona } from '../Interfaces/Persona';
import { Router } from  '@angular/router';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {


  idPersona: string = "";

  persona = {} as Persona;

  listaSexos: any = [];

  constructor(private personaApi: PersonaProvider, private route: ActivatedRoute,private router:Router) {

    this.idPersona = this.route.snapshot.params["id"];

    this.cargarComboSexos();
    this.cargarPersonaById(this.idPersona);
   }

  ngOnInit(): void {
    console.log(this.idPersona);
  }




  //----------------------------------------------------------------
  async cargarComboSexos(){
    this.personaApi.getSexos().subscribe((data) => {
      if(data.ok) this.listaSexos = data.listaSexos;    
      else alert(data.error);     
    });
  }
  //----------------------------------------------------------------
  async cargarPersonaById(idPersona:string){
    this.personaApi.getPersonaById(idPersona).subscribe((data) => {

      if(data.ok){
        console.log(data);
        this.persona.nombre = data.r_Nombre; 
        this.persona.apellido = data.r_Apellido;
        this.persona.dni = data.r_Dni;
        this.persona.sexo = data.r_Sexo;
        console.log(this.persona);
      }
      else{ 
        alert(data.error);
      }
    });
  }

  async modificarPersona(){
    if([this.persona.nombre, this.persona.apellido, this.persona.dni].includes("") || this.persona.sexo==null) {
      alert("Error de validación, todos los campos son obligatorios");
      return
    }
    else{
      this.personaApi.putPersona(this.idPersona,this.persona.nombre,this.persona.apellido,this.persona.dni,this.persona.sexo).subscribe((data) => { 
        
        if(data.ok){
          alert("Modificación de Persona exitosa");
          this.router.navigateByUrl('/listas');
        }
        else{
          alert(data.error);
          
        }
  
      });
    }
  }
}
