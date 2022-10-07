/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
/* eslint-disable no-underscore-dangle */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Medicion } from '../model/medicion';

@Injectable({
  providedIn: 'root'
})
export class MedicionService {


  constructor(private _http: HttpClient) { }

  getMedicionesDispositivoId(id): Promise<Medicion[]>{
    return this._http.get(`http://localhost:8000/api/dispositivo/${id}/mediciones`).toPromise().then((mediciones: Medicion[])=>mediciones);
  };

  postMedicion(medicion: Medicion){
    return this._http.post(`http://localhost:8000/api/medicion/agregar`,{fecha:medicion.fecha,valor:medicion.valor,dispositivoId:medicion.dispositivoId}).toPromise().then((result)=>{
      return result;
    });
  }
}
