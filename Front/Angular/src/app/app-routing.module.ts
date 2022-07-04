import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { ListasComponent } from './listas/listas.component';
import { EditarComponent } from './editar/editar.component';
import { CrearPersonaComponent } from './crear-persona/crear-persona.component'

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "crearusuario", component: CrearUsuarioComponent },
  { path: "listas", component: ListasComponent },
  { path: "editar/:id", component: EditarComponent},
  { path: "crearpersona", component: CrearPersonaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
