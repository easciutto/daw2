import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'dispositivo',
  templateUrl: './dispositivo.component.html',
  styleUrls: ['./dispositivo.component.css']
})
export class DispositivoComponent implements OnInit {

  @Input()dispositivo:any;
  @Output() onChange= new EventEmitter();

  constructor() {
    console.log(this.dispositivo);
  }

  ngOnInit(): void {
  }

  realizarCambio(){
    this.dispositivo.nombre="Le cambio el nombre";
    this.onChange.emit(this.dispositivo);
  }
}
