import { Component, /*EventEmitter, Input, Output,*/ OnInit} from '@angular/core';
import { Dispositivo } from '../model/dispositivo';
import { ListadoService } from '../services/listado.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dispositivo',
  templateUrl: './dispositivo.page.html',
  styleUrls: ['./dispositivo.page.scss'],
})
export class DispositivoPage implements OnInit {

  //@Input()dispositivo: any;
  //@Output() onChange= new EventEmitter();
  public dispositivo: Dispositivo;
  constructor(private router: ActivatedRoute, private lServ: ListadoService) {
    console.log(this.dispositivo);
  }

  ngOnInit(): void {
    // eslint-disable-next-line prefer-const
    let idDispositivo = this.router.snapshot.paramMap.get('id');
    this.dispositivo = this.lServ.getDispositivo(idDispositivo);
    console.log(this.dispositivo);
  }

  /*realizarCambio(){
    this.dispositivo.nombre='Le cambio el nombre';
    //this.onChange.emit(this.dispositivo);
  }*/
}
