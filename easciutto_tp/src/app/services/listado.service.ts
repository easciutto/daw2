/* eslint-disable no-underscore-dangle */
/* eslint-disable eqeqeq */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { Dispositivo } from '../model/dispositivo';

@Injectable({
  providedIn: 'root'
})
export class ListadoService {
  listado: Array<Dispositivo> = new Array<Dispositivo>();
  // public miObservable$: Observable<number>=of(1,2,3);
  // public sub: Subscription;

  constructor(private _http: HttpClient) {  //para que llame a un servicio de http
    const disp: Dispositivo= new Dispositivo(1,'Electroválvula 1','Patio frente',1);
    const disp2: Dispositivo= new Dispositivo(2,'Sensor temperatura','Cocina',2);
    const disp3: Dispositivo= new Dispositivo(3,'Electroválvula 2','Jardin Delantero',3);
    const disp4: Dispositivo= new Dispositivo(4,'Sensor temperatura','Living',4);
    this.listado.push(disp);
    this.listado.push(disp2);
    this.listado.push(disp3);
    this.listado.push(disp4);
    // this.sub = this.miObservable$.subscribe((data)=>{
    //   console.log(data);
    // });
    // this.sub.unsubscribe();
    }

  // getDispositivos(){
  //   return this.listado;
  //   // eslint-disable-next-line no-underscore-dangle
  //   //return this._http.get('http://localhost:8000/api/dispositivo');
  //   // eslint-disable-next-line no-underscore-dangle
  //   //return this._http.post('http://localhost:3000/dispositivo', {body:''});
  // }

  getDispositivo(id): Dispositivo{
    return this.listado.filter(dispositivo=> dispositivo.dispositivoId==id)[0];
  }

  getDispositivos(): Promise<Dispositivo[]>{
    // eslint-disable-next-line arrow-body-style
    return this._http.get('http://localhost:8000/api/dispositivo').toPromise().then((dispositivos: Dispositivo[])=>{
      return dispositivos;
    });
  }

  // getDispositivo(id): Promise<Dispositivo>{
  //   return this._http.get('http://localhost:8000/api/dispositivo/'+id).toPromise().then((dispositivo: Dispositivo)=>dispositivo);
  // };
}
