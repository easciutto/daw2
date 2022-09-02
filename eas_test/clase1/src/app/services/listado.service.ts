import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dispositivo } from '../dispositivos/dispositivo';

@Injectable({
  providedIn: 'root'
})
export class ListadoService {
  listado:Array<Dispositivo> = new Array<Dispositivo>();

  public listadoDispositivos=[

    {
      dispositivoId:1,
      nombre:"Dispositivo1",
      ubicacion:"cocina",
      electrovalvulaId:1
    },
    {
      dispositivoId:2,
      nombre:"Dispositivo2",
      ubicacion:"living",
      electrovalvulaId:2
    },
    {
      dispositivoId:3,
      nombre:"Dispositivo3",
      ubicacion:"patio",
      electrovalvulaId:3
    },
    {
      dispositivoId:4,
      nombre:"Dispositivo4",
      ubicacion:"jardin delantero",
      electrovalvulaId:4
    }


  ];

  constructor(private _http:HttpClient) {  //para que llame a un servicio de http
    var disp:Dispositivo= new Dispositivo(1,"Sensor 1","Patio",1);
    var disp2:Dispositivo= new Dispositivo(2,"Sensor 2","Cocina",2);
    var disp3:Dispositivo= new Dispositivo(3,"Sensor 3","Jardin Delantero",3);
    var disp4:Dispositivo= new Dispositivo(4,"Sensor 4","Living",4);
    this.listado.push(disp);
    this.listado.push(disp2);
    this.listado.push(disp3);
    this.listado.push(disp4);
  }

  getDispositivos(){
  //getDispositivos(id:string){ //para el caso del get
    //return this.listadoDispositivos;
    return this.listado;
    //return this._http.get("http://localhost:3000/dispositivos"+id);
    //return this._http.post("http://localhost:3000/dispositivos", {body:""});
  }
}
