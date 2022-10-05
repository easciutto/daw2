import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
// import { NombrePipePipe } from 'src/app/pipes/nombre-pipe.pipe';
import { NombreDirectivaDirective } from 'src/app/directives/nombre-directiva.directive';
// import { DispositivoPageModule } from '../dispositivo/dispositivo.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    // DispositivoPageModule
  ],
  // declarations: [HomePage, NombrePipePipe, NombreDirectivaDirective]
  declarations: [HomePage, NombreDirectivaDirective]
})
export class HomePageModule {}
