import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoEV'
})
export class EstadoElectrovalvulaPipe implements PipeTransform {

  transform(value: boolean): string {
    if (value){
      return 'abierta';
    };
    return 'cerrada';
  }

}
