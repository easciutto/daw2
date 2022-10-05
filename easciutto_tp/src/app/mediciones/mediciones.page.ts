import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Medicion } from '../model/medicion';
import { MedicionService } from '../services/medicion.service';


@Component({
  selector: 'app-mediciones',
  templateUrl: './mediciones.page.html',
  styleUrls: ['./mediciones.page.scss'],
})

export class MedicionesPage implements OnInit {

  listadoMediciones: Medicion[];

  constructor(private router: ActivatedRoute, private medicionS: MedicionService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    const idDispositivo= this.router.snapshot.paramMap.get('id');
    const idDispositivoInt= parseInt(idDispositivo, 10);
    console.log(`idDispositivo:${idDispositivo}`);
    this.solicitoMediciones(idDispositivoInt);

  }

  async solicitoMediciones(idDispositivo: number) {
    const listaMed= await this.medicionS.getMedicionesDispositivoId(idDispositivo);
    this.listadoMediciones=listaMed;
  }


}
