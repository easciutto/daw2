import { Component} from '@angular/core';
import { ListadoService } from '../services/listado.service';
import { Dispositivo } from '../model/dispositivo';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  arrayDispositivos: Dispositivo[];

  constructor(public listadoS: ListadoService) {}

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ionViewDidEnter(): void {
    this.metodoAsyncAwait();
  }

  async metodoAsyncAwait(){
    try{
      const valorExito: any = await this.listadoS.getDispositivos();
      console.log(valorExito);
      this.arrayDispositivos=valorExito;
    }
    catch (error){
      console.log('Error al buscar dispositivos');
    };
  }

}
