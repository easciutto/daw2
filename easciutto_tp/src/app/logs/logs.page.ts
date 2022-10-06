import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Log } from '../model/log';
import { LogsService } from '../services/log.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.page.html',
  styleUrls: ['./logs.page.scss'],
})

export class LogsPage implements OnInit {

  listadoLogs: Log[];
  public idDispositivo: string;

  constructor(private router: ActivatedRoute, public logS: LogsService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    //console.log('entro a logs');
    this.idDispositivo= this.router.snapshot.paramMap.get('id');
    const idDispositivoInt= parseInt(this.idDispositivo, 10);
    //console.log(`idDispositivo:${this.idDispositivo}`);
    this.solicitoLogs(idDispositivoInt);

  }

  async solicitoLogs(electrovalvulaId: number){
    const listaLogs= await this.logS.getLogs(electrovalvulaId);
    this.listadoLogs=listaLogs;
  }

}
