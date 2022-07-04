import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonaProvider } from 'src/Providers/PersonaProvider';
import { Persona } from '../Interfaces/Persona';
import { Router } from  '@angular/router';

@Component({
  selector: 'app-crear-persona',
  templateUrl: './crear-persona.component.html',
  styleUrls: ['./crear-persona.component.css']
})
export class CrearPersonaComponent implements OnInit {

  constructor(private personaApi: PersonaProvider,private router:Router) {
    this.CargarComboSexo();
   }

  persona = {} as Persona;
  listaSexos: any = [];

  ngOnInit(): void {
  }
  //-------------------------------------------------------------------------------------------------------------
  async CargarComboSexo(){
    this.personaApi.getSexos().subscribe((data) => {
      if(data.ok) this.listaSexos = data.listaSexos;    
      else alert(data.error);     
    });
  }
  //-------------------------------------------------------------------------------------------------------------
  async CrearPersona(){
    if(this.ValidarCampos()) {
      this.personaApi.createPersona(
        this.persona.nombre,this.persona.apellido,this.persona.dni,
        this.persona.sexo,this.persona.calle,this.persona.numero).subscribe((data) => { 
        
        if(data.ok){
          alert("Persona creada con éxito");
          this.router.navigateByUrl('/listas');
        }
        else alert(data.error); 
      });     
    }
    else{     
      alert("Error de validación, todos los campos son obligatorios");
      return
    }
  }
  //-------------------------------------------------------------------------------------------------------------
  ValidarCampos():boolean{
    if([this.persona.nombre,
        this.persona.apellido,
        this.persona.dni,
        this.persona.calle,
        this.persona.numero].includes("") || this.persona.sexo == null || isNaN(parseInt(this.persona.numero)))
      return false;
    return true;
  }
  //-------------------------------------------------------------------------------------------------------------


}
