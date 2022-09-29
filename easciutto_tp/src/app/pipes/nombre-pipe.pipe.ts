import { Pipe, PipeTransform } from '@angular/core';
/*
elevar -el exponente por dafault es 1
uso: valor | elevar:exponente
ejemplo: {{2 | elevar:10}}
espero obtener 1024
*/
@Pipe({
  name: 'elevar' //como se va a llamar desde el html
})
export class NombrePipePipe implements PipeTransform {

  transform(value: number, exponente: number): number {
    return Math.pow(value, exponente);
  }
  /* ejemplo para aplicar en el TP
  transform(value:string):string{
    return value + 'kPA';
  }
  */

  /*transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  } */

}
