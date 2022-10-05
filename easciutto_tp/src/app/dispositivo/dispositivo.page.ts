/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dispositivo } from '../model/dispositivo';
import { ListadoService } from '../services/listado.service';
import { Medicion } from '../model/medicion';
import { MedicionService } from '../services/medicion.service';
import { AlertController } from '@ionic/angular';
//import { KpapipePipe } from '../pipes/kpapipe.pipe';

import * as Highcharts from 'highcharts';
//import * as moment from 'moment';

// eslint-disable-next-line no-var
declare var require: any;
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);

@Component({
  selector: 'app-dispositivo',
  templateUrl: './dispositivo.page.html',
  styleUrls: ['./dispositivo.page.scss'],
})
export class DispositivoPage implements OnInit {

  public myChart;
  private chartOptions;
  public dispositivo: Dispositivo;
  public medicion: Medicion;
  public showOpenButton: boolean;
  public idElectrovalvula: number;
  public idDispositivo: string;
  public requiereRiego: boolean;
  public existenMediciones: boolean;

  constructor(private router: ActivatedRoute, private lServ: ListadoService, private mServ: MedicionService, public alertController: AlertController) {
    this.showOpenButton = true;

   }

  ngOnInit() {
    this.idDispositivo = this.router.snapshot.paramMap.get('id');

   // this.generarChart(this.medicion.valor);
  }

  async ionViewDidEnter() {
    this.generarChart(10,'indefinido');
    this.loadDispositivo();
  }

  async loadDispositivo() {
    this.dispositivo = await this.lServ.getDispositivo1(Number.parseInt(this.idDispositivo, 10));
    this.medicion = await this.lServ.getUltimaMedicion(Number.parseInt(this.idDispositivo, 10));
    this.idElectrovalvula = this.dispositivo.electrovalvulaId;
    if(this.medicion == null) {
      this.existenMediciones = false;
      console.log('No existen mediciones');
    } else {
      this.existenMediciones = true;
      this.updateChart(Number.parseInt(this.medicion.valor.toString(), 10));
    }
  }

  async openElectrovalvula() {
    await this.lServ.putEstadoElectrovalvula(true, this.dispositivo.electrovalvulaId);
    this.showOpenButton = false;
  }

  async closeElectrovalvula() {
    await this.lServ.putEstadoElectrovalvula(false, this.dispositivo.electrovalvulaId);
    const nuevaMedicion = Math.floor(Math.random()* this.medicion.valor);
    //await this.mServ.postMedicion(new Medicion(0,moment().format('YYYY-MM-DD hh:mm:ss'),nuevaMedicion,this.dispositivo.dispositivoId));
    await this.mServ.postMedicion(new Medicion(0, new Date(),nuevaMedicion,this.dispositivo.dispositivoId));
    this.showOpenButton = true;
    this.updateChart(Number.parseInt(nuevaMedicion.toString(), 10));
  }

  async presentAlert(valor: number) {

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
      subHeader: 'Condicion del suelo',
      //message: `El suelo tiene  ${new KpapipePipe().transform(valor)}, debe abrir electrovalvula` ,
      message: `Debe abrir electrovalvula valor: ${valor} kPa` ,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }


  generarChart(valorObtenido: number, nombre: string) {
    this.chartOptions={
      chart: {
          type: 'gauge',
          plotBackgroundColor: null,
          plotBackgroundImage: null,
          plotBorderWidth: 0,
          plotShadow: false
        }
        ,title: {
          text: nombre
        }

        ,credits:{enabled:false}

        ,pane: {
            startAngle: -150,
            endAngle: 150
        }
        // the value axis
      ,yAxis: {
        min: 0,
        max: 100,

        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: 'inside',
        minorTickColor: '#666',

        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
            step: 2,
            rotation: 'auto'
        },
        title: {
            text: 'kPA'
        },
        plotBands: [{
            from: 0,
            to: 10,
            color: '#55BF3B' // green
        }, {
            from: 10,
            to: 30,
            color: '#DDDF0D' // yellow
        }, {
            from: 30,
            to: 100,
            color: '#DF5353' // red
        }]
    }
    ,

    series: [{
        name: 'kPA',
        data: [valorObtenido],
        tooltip: {
            valueSuffix: ' kPA'
        }
    }]

    };
    this.myChart = Highcharts.chart('highcharts', this.chartOptions );
  }

  async handleButtonOpenClick() {
    const alert = await this.alertController.create({
      header: 'Abrir electrovalvula?',
      message: 'Seguro desea abrir la electrovalvula?',
      buttons: [{text:'Cancel', handler: () => close}, {text: 'Ok', handler: () =>this.openElectrovalvula()}],
    });

    await alert.present();
  }

  async handleButtonCloseClick() {
    const alert = await this.alertController.create({
      header: 'Cerrar electrovalvula?',
      message: 'Seguro desea cerrar la electrovalvula?',
      buttons: [{text:'Cancel', handler: () => close}, {text: 'Ok', handler: () =>this.closeElectrovalvula()}],
    });

    await alert.present();
  }

  async callGenerarMedicion() {
    const alert = await this.alertController.create({
      header: 'Medir suelo',
      message: 'Seguro desea generar una nueva medicion?',
      buttons: [{text:'Cancel', handler: () => close}, {text: 'Ok', handler: () =>this.generarNuevaMedicion()}],
    });

    await alert.present();

  }

  async generarNuevaMedicion() {
    const nuevaMedicion = Math.floor(Math.random()* 100);
    //await this.mServ.postMedicion(new Medicion(0,moment().format('YYYY-MM-DD hh:mm:ss'),nuevaMedicion,this.dispositivo.dispositivoId));
    await this.mServ.postMedicion(new Medicion(0,new Date(),nuevaMedicion,this.dispositivo.dispositivoId));
    this.existenMediciones = true;
    this.updateChart(Number.parseInt(nuevaMedicion.toString(), 10));

  }

  updateChart(newValue: number) {
    if(newValue>= 30 && newValue <= 100) {
      this.presentAlert(newValue);
      this.requiereRiego = true;

    } else {
      this.requiereRiego = false;
    }
    this.myChart.update({
      title:{text:this.dispositivo.nombre},
      series: [{
      name: 'kPA',
      data: [newValue],
      tooltip: {
          valueSuffix: ' kPA'
      }
      }]});
  }
}
