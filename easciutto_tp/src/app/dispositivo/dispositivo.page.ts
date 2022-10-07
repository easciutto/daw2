/* eslint-disable prefer-const */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dispositivo } from '../model/dispositivo';
import { ListadoService } from '../services/listado.service';
import { Medicion } from '../model/medicion';
import { MedicionService } from '../services/medicion.service';
import { AlertController } from '@ionic/angular';
import * as Highcharts from 'highcharts';
import * as moment from 'moment';

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
  public iniciarRiegoMask: boolean;
  public idElectrovalvula: number;
  public idDispositivo: string;
  public regar: boolean;
  public medicionesHistoricas: boolean;
  public momentjs: any = moment;

  constructor(private router: ActivatedRoute, private lServ: ListadoService, private mServ: MedicionService, public alertController: AlertController) {
    this.iniciarRiegoMask = true;

   }

  ngOnInit() {
    this.idDispositivo = this.router.snapshot.paramMap.get('id');

   // this.generarChart(this.medicion.valor);
  }

  async ionViewDidEnter() {
    this.generarChart(10,'indefinido');
    this.cargarDispositivo();
  }

  async cargarDispositivo() {
    try{
      const idDispositivoInt= parseInt(this.idDispositivo, 10);
      const valorExito = await this.lServ.getDispositivo1(idDispositivoInt);
      this.dispositivo = valorExito;
      this.medicion = await this.lServ.getUltimaMedicion(idDispositivoInt);
      this.idElectrovalvula = this.dispositivo.electrovalvulaId;
      if(this.medicion == null) {
        this.medicionesHistoricas = false;
        console.log('No hay mediciones historicas');
      } else {
        this.medicionesHistoricas = true;
        this.updateChart(Number.parseInt(this.medicion.valor.toString(), 10));
      }
    }
    catch (error){
      console.log('Error al buscar el dispositivo');
    };
  }

  async solicitoMedicion() {
    const alert = await this.alertController.create({
      header: 'Medir humedad',
      message: 'Confirma?',
      buttons: [{text:'Cancel', handler: () => close}, {text: 'Ok', handler: () =>this.generarNuevaMedicion()}],
    });

    await alert.present();

  }

  async generarNuevaMedicion() {
    let nuevaMedicion = Math.floor(Math.random()* 100);
    let fechaAct = this.momentjs().format('YYYY-MM-DD HH:mm:ss');
    await this.mServ.postMedicion(new Medicion(0,fechaAct,nuevaMedicion,this.dispositivo.dispositivoId));
    this.medicionesHistoricas = true;
    this.updateChart(Number.parseInt(nuevaMedicion.toString(), 10));

  }

  async abrirElectrovalvula() {
    await this.lServ.putEstadoElectrovalvula(true, this.dispositivo.electrovalvulaId);
    this.iniciarRiegoMask = false;
  }

  async cerrarElectrovalvula() {
    await this.lServ.putEstadoElectrovalvula(false, this.dispositivo.electrovalvulaId);
    const nuevaMedicion = Math.floor(Math.random()* this.medicion.valor);
    const fechaActual = this.momentjs().format('YYYY-MM-DD HH:mm:ss');
    await this.mServ.postMedicion(new Medicion(0,fechaActual,nuevaMedicion,this.dispositivo.dispositivoId));
    this.iniciarRiegoMask = true;
    this.updateChart(Number.parseInt(nuevaMedicion.toString(), 10));
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

  updateChart(newValue: number) {
    if(newValue>= 30 && newValue <= 100) {
      this.presentAlert(newValue);
      this.regar = true;

    } else {
      this.regar = false;
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

  async handleBotonAbrir() {
    const alert = await this.alertController.create({
      header: 'Abrir electrovalvula',
      message: 'Confirma?',
      buttons: [{text:'Cancel', handler: () => close}, {text: 'Ok', handler: () =>this.abrirElectrovalvula()}],
    });

    await alert.present();
  }

  async handleBotonCerrar() {
    const alert = await this.alertController.create({
      header: 'Cerrar electrovalvula',
      message: 'Confirma?',
      buttons: [{text:'Cancel', handler: () => close}, {text: 'Ok', handler: () =>this.cerrarElectrovalvula()}],
    });

    await alert.present();
  }

  async presentAlert(valor: number) {

    const alert = await this.alertController.create({
      //cssClass: 'my-custom-class',
      header: 'Atención',
      subHeader: `baja humedad: ${valor} kPa`,
      message: `Se sugiere iniciar el riego`,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
