/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-underscore-dangle */
/* eslint-disable eqeqeq */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { Dispositivo } from '../model/dispositivo';
import { Medicion } from '../model/medicion';

@Injectable({
  providedIn: 'root'
})
export class ListadoService {
  listado: Array<Dispositivo> = new Array<Dispositivo>();

  constructor(private _http: HttpClient) {  //para que llame a un servicio de http
    const disp: Dispositivo= new Dispositivo(1,'Electroválvula 1','Patio frente',1);
    const disp2: Dispositivo= new Dispositivo(2,'Sensor temperatura','Cocina',2);
    const disp3: Dispositivo= new Dispositivo(3,'Electroválvula 2','Jardin Delantero',3);
    const disp4: Dispositivo= new Dispositivo(4,'Sensor temperatura','Living',4);
    this.listado.push(disp);
    this.listado.push(disp2);
    this.listado.push(disp3);
    this.listado.push(disp4);
  }

  // getDispositivos(){
  //   return this.listado;

  getDispositivo(id): Dispositivo{
    return this.listado.filter(dispositivo=> dispositivo.dispositivoId==id)[0];
  }

  getDispositivos(): Promise<Dispositivo[]>{

    return this._http.get('http://localhost:8000/api/dispositivo').toPromise().then((dispositivos: Dispositivo[])=>{
      return dispositivos;
    });
  }

  getDispositivo1(id): Promise<Dispositivo>{
    return this._http.get('http://localhost:8000/api/dispositivo/'+id).toPromise().then((dispositivo: Dispositivo)=>{
      return dispositivo[0];
    });
  };

  getUltimaMedicion(id: number): Promise<Medicion>{
    return this._http.get(`http://localhost:8000/api/dispositivo/${id}/medicionActual`).toPromise().then((medicion: Medicion)=>{
      return medicion[0];
    });
  }

  putEstadoElectrovalvula(abrir: Boolean, id: number){
    let url = null;
    if(abrir) {
      url = `http://localhost:8000/api/electrovalvula/${id}/abrir`;
    } else {
      url = `http://localhost:8000/api/electrovalvula/${id}/cerrar`;
    }
    return this._http.put(url, null).toPromise().then(()=>{
    });
  }

}

