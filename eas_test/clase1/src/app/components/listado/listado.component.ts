import { Component, OnInit } from '@angular/core';
import { ListadoService } from 'src/app/services/listado.service';


@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  texto:string= "soy un texto";
  nroTarjeta:string="";
  estaDeshabilitado:boolean=false;
  miArray;

  constructor(public listadoS:ListadoService) {
    // console.log(this.listadoS.getDispositivos());
    this.miArray=this.listadoS.getDispositivos();

   }


  ngOnInit(): void {

  }

  miMetodo(parametro1:string){
    console.log("clik en el boton", parametro1);
    console.log(this.nroTarjeta);
  }
  cambiarValor(){
    this.estaDeshabilitado=!this.estaDeshabilitado;
  }

  devolverTrue(){
    return true;
  }

  manejadorHijo(valor:any){
    console.log(valor);
  }
}
