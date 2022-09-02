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
  miArray:any;

  constructor(public listadoS:ListadoService) { }

  ngOnInit(): void {
    // console.log(this.listadoS.getDispositivos());
    this.miArray=this.listadoS.getDispositivos();

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

}
