import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosComponent } from './components/cursos/cursos.component';
import { MaterialModule } from '../material.module';
import { FiltroCursosPipe } from './pipe/filtro-cursos.pipe';
import { SharedModule } from '../shared/shared.module';
import { CursosRoutingModule } from './cursos-routing.module';
import { VistaComponent } from './components/vista/vista.component';
import { InicioComponent } from './components/inicio/inicio.component';


@NgModule({
  declarations: [
    InicioComponent,
    CursosComponent,
    VistaComponent,
    FiltroCursosPipe,
    InicioComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CursosRoutingModule
  ],
  exports: [
    MaterialModule,

  ]
})
export class CursosModule { }
