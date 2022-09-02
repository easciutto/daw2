import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDirectivaAttr]'
})
export class NombreDirectivaDirective {

  constructor(private el:ElementRef) {
    //el.nativeElement.style.backgroundColor="orange";
   }
    private cambiar(color:string){
      this.el.nativeElement.style.backgroundColor=color;
    }
    @HostListener('mouseenter') onMouseEnter() {
      this.cambiar('blue');
    }

    @HostListener('mouseleave') onMouseLeave() {
      this.cambiar('');
    }

}
