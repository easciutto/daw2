import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'PresionPipe'
})
export class UnidadPresionPipePipe implements PipeTransform {

  transform(value: number): string{
    return value + 'kPa';
  }
}
