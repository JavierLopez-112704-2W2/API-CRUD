import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class UsuarioProvider{

    apiUrlBase : string = environment.urlBase; 
    
    constructor(private http: HttpClient){

    }

    postLogin(nombreUsu: string, password: string): Observable<any>{
        const comando = {
            "cnombreUsu": nombreUsu,
            "cpasswordUsu": password
        };

        const url = this.apiUrlBase + '/api/usuario/login';
        const headers = { 'Content-Type': 'application/json' };
        const body = JSON.stringify(comando);
        console.log(body);
        return this.http.post(url, body, {'headers': headers});

    }

    getRoles():Observable<any>{
        const url = this.apiUrlBase + '/api/usuario/GetRoles';
        const headers = { 'Content-Type': 'application/json' };
        return this.http.get(url, {'headers': headers});
    }

    createUsuario(nombreU: string, passwordU: string, tipoU: string):Observable<any>{
        const comando = {
            "cnombreUsu": nombreU,
            "cpasswordUsu": passwordU,
            "ctipoUsuario": tipoU
        }
        
        const url = this.apiUrlBase + '/api/usuario/create';
        const headers = { 'Content-Type': 'application/json' };
        const body = JSON.stringify(comando);
        return this.http.post(url, body, {'headers': headers});
    }

}

