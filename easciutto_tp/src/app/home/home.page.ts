import { Component, OnInit } from '@angular/core';
import { ListadoService } from '../services/listado.service';
import { Dispositivo } from '../model/dispositivo';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage /*implements OnInit*/{

  texto= 'soy un texto';
  arrayDispositivos: Dispositivo[];

  constructor(public listadoS: ListadoService) {}
    //console.log(this.listadoS.getDispositivos());
    //this.arrayDispositivos=this.listadoS.getDispositivos();
    //constructor(){}

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit(): void {
    //console.log(this.listadoS.getDispositivos());
    //this.arrayDispositivos=this.listadoS.getDispositivos();
    //metodo 1 para aplicar Promises
    // this.listadoS.getDispositivos()
    // .then((valorExito)=>{
    //   console.log(valorExito);
    //   this.arrayDispositivos=valorExito;
    // })
    // .catch((err)=>{
    //   console.log('Error al buscar dispositivos');
    // });
    this.metodoAsyncAwait();
  }

  async metodoAsyncAwait(){
    try{
      const valorExito: any = await this.listadoS.getDispositivos();
      console.log(valorExito);
      this.arrayDispositivos=valorExito;
    }
    catch (error){
      console.log('Error al buscar dispositivos');
    };
  }
  // miMetodo(parametro1: string){
  //   console.log('clik en el boton', parametro1);
  //   console.log(this.nroTarjeta);
  // }
  // cambiarValor(){
  //   this.estaDeshabilitado=!this.estaDeshabilitado;
  // }

  // devolverTrue(){
  //   return true;
  // }

  // manejadorHijo(valor: any){
  //   console.log(valor);
  // }

}
