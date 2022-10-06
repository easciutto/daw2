/* eslint-disable @typescript-eslint/member-ordering */
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDirectivaAttr]'
})
export class NombreDirectivaDirective {

  constructor(private el: ElementRef) {
    el.nativeElement.style.backgroundColor='LightCyan';
    //el.nativeElement.style.color ='orange';

  }
  private cambiar(color: string){
    this.el.nativeElement.style.backgroundColor=color;
  }
  @HostListener('mouseenter') onMouseEnter() {
    this.cambiar('DeepSkyBlue');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.cambiar('LightCyan');
  }

}
