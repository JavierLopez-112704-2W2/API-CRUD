import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class PersonaProvider{

    apiUrlBase : string = environment.urlBase; 
    
    constructor(private http: HttpClient){

    }

    //--------------------------------------------------------------------------------------------------------
    getPersonas(): Observable<any>{
        const url = this.apiUrlBase + '/api/persona/GetPersonas';
        const headers = { 'Content-Type': 'application/json' };
        return this.http.get(url, {'headers': headers});
    }
    //--------------------------------------------------------------------------------------------------------
    getSexos(): Observable<any>{
        const url = this.apiUrlBase + '/api/persona/GetSexos';
        const headers = { 'Content-Type': 'application/json' };
        return this.http.get(url, {'headers': headers});
    }
    //--------------------------------------------------------------------------------------------------------
    getPersonaById(id:string): Observable<any>{
        const url = this.apiUrlBase + '/api/persona/GetPersona/' + id;
        const headers = { 'Content-Type': 'application/json' };
        return this.http.get(url, {'headers': headers});
    }
    //--------------------------------------------------------------------------------------------------------
    putPersona(id:string, nombre: string,apellido: string,dni: string,sexo: string): Observable<any>{
        const comando = {
            "c_Id":  id,
            "c_Nombre": nombre,
            "c_Apellido": apellido,
            "c_Dni": dni,
            "c_NombreSexo": sexo
        }
        const url = this.apiUrlBase + '/api/persona/UpdatePersona';
        const headers = { 'Content-Type': 'application/json' };
        const body = JSON.stringify(comando);
        return this.http.put(url, body, {'headers': headers});

    }
    //--------------------------------------------------------------------------------------------------------
    deletePersona(id:string): Observable<any>{
        
        const url = this.apiUrlBase + '/api/persona/delete/' + id;
        const headers = { 'Content-Type': 'application/json' };
        
        return this.http.delete(url, {'headers': headers});

    }
    //--------------------------------------------------------------------------------------------------------
    createPersona(nombre:string,apellido:string,dni:string,sexo:string,calle:string,numero:string):Observable<any>{
        const comando = {
            "c_Nombre": nombre,
            "c_Apellido": apellido,
            "c_Dni": dni,
            "c_NombreSexo": sexo,
            "c_Calle": calle,
            "c_Numero": numero
        }
        const url = this.apiUrlBase + '/api/persona/create';
        const headers = { 'Content-Type': 'application/json' };
        const body = JSON.stringify(comando);
        return this.http.post(url, body, {'headers': headers});
    }
    //--------------------------------------------------------------------------------------------------------


}