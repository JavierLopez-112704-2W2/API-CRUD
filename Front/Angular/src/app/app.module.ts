import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { HttpClientModule } from '@angular/common/http';
import { UsuarioProvider} from '../Providers/UsuarioProvider';
import { ListasComponent } from './listas/listas.component';
import { PersonaProvider } from '../Providers/PersonaProvider';
import { EditarComponent } from './editar/editar.component';
import { CrearPersonaComponent } from './crear-persona/crear-persona.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CrearUsuarioComponent,
    ListasComponent,
    EditarComponent,
    CrearPersonaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [UsuarioProvider,PersonaProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
