import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListadoModule } from './components/listado/listado.module';
import { HttpClientModule } from '@angular/common/http';
//import { NombreDirectivaDirective } from './directives/nombre-directiva.directive';
//import { NombrePipePipe } from './pipes/nombre-pipe.pipe';



@NgModule({
  declarations: [
    AppComponent
    /*NombrePipePipe,*/
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ListadoModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
