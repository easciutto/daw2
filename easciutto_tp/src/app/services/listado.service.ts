/* eslint-disable eqeqeq */
import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { Dispositivo } from '../model/dispositivo';

@Injectable({
  providedIn: 'root'
})
export class ListadoService {
  listado: Array<Dispositivo> = new Array<Dispositivo>();


  constructor(/*private _http:HttpClient*/) {  //para que llame a un servicio de http
    const disp: Dispositivo= new Dispositivo(1,'Electroválvula 1','Patio frente',1);
    const disp2: Dispositivo= new Dispositivo(2,'Sensor temperatura','Cocina',2);
    const disp3: Dispositivo= new Dispositivo(3,'Electroválvula 2','Jardin Delantero',3);
    const disp4: Dispositivo= new Dispositivo(4,'Sensor temperatura','Living',4);
    this.listado.push(disp);
    this.listado.push(disp2);
    this.listado.push(disp3);
    this.listado.push(disp4);
  }

  getDispositivos(){
    return this.listado;
    //return this._http.get("http://localhost:3000/dispositivos"+id);
    //return this._http.post("http://localhost:3000/dispositivos", {body:""});
  }

  getDispositivo(id): Dispositivo{
    return this.listado.filter(dispositivo=> dispositivo.dispositivoId==id)[0];
 }
}
