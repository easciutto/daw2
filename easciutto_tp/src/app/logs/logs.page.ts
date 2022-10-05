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
  constructor(private router: ActivatedRoute, public logS: LogsService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    console.log('entro a logs');
    const idDispositivo= this.router.snapshot.paramMap.get('id');
    const idDispositivoInt= parseInt(idDispositivo, 10);
    console.log(`idDispositivo:${idDispositivo}`);
    this.solicitoLogs(idDispositivoInt);

  }

  async solicitoLogs(electrovalvulaId: number){
    const listaLogs= await this.logS.getLogs(electrovalvulaId);
    this.listadoLogs=listaLogs;
  }

}
