import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoComponent } from './listado.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NombrePipePipe } from 'src/app/pipes/nombre-pipe.pipe';
import { NombreDirectivaDirective } from 'src/app/directives/nombre-directiva.directive';
import { DispositivoModule } from '../dispositivo/dispositivo.module';



@NgModule({
  declarations: [ListadoComponent, NombrePipePipe, NombreDirectivaDirective],
  imports: [
    CommonModule,
    FormsModule,
    DispositivoModule
  ],
  exports: [ListadoComponent]
})
export class ListadoModule { }
