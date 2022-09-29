import { Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import { Dispositivo } from '../model/dispositivo';
import { ListadoService } from '../services/listado.service';
import { ActivatedRoute } from '@angular/router';
import * as Highcharts from 'highcharts';
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

  //@Input()dispositivo: any;
  //@Output() onChange= new EventEmitter();
  public dispositivo: Dispositivo;
  private valorObtenido: number;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  public myChart;
  private chartOptions;

  constructor(private router: ActivatedRoute, private lServ: ListadoService) {
    setTimeout(()=>{
      console.log(this.dispositivo);
      console.log('Cambio el valor del sensor');
      this.valorObtenido=60;
      //llamo al update del chart para refrescar y mostrar el nuevo valor
      this.myChart.update({series: [{
          name: 'kPA',
          data: [this.valorObtenido],
          tooltip: {
              valueSuffix: ' kPA'
          }
      }]});
    },2000);
  }

  ngOnInit(): void {
    // eslint-disable-next-line prefer-const
    let idDispositivo = this.router.snapshot.paramMap.get('id');
    this.dispositivo = this.lServ.getDispositivo(idDispositivo);
    console.log(this.dispositivo);
  }

  ionViewWillEnter(){
    this.generarChart();
  }

  generarChart() {
    this.chartOptions={
      chart: {
          type: 'gauge',
          plotBackgroundColor: null,
          plotBackgroundImage: null,
          plotBorderWidth: 0,
          plotShadow: false
        }
        ,title: {
          text: 'Sensor N° 1'
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
          data: [this.valorObtenido],
          tooltip: {
            valueSuffix: ' kPA'
          }
        }]
      };
      this.myChart = Highcharts.chart('highcharts', this.chartOptions );
    }

  /*realizarCambio(){
    this.dispositivo.nombre='Le cambio el nombre';
    //this.onChange.emit(this.dispositivo);
  }*/
}
