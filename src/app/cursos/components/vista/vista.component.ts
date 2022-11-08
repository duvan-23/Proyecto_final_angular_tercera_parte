import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CursosService } from 'src/app/clases/services/cursos.service';
import { EstudiantesService } from 'src/app/estudiantes/services/estudiantes.service';
import { Curso } from 'src/app/models/curso';
import { Estudiantes } from 'src/app/models/estudiantes';

@Component({
  selector: 'app-vista',
  templateUrl: './vista.component.html',
  styleUrls: ['./vista.component.css']
})
export class VistaComponent implements OnInit {
  id!:number;
  curso$!: Observable<Curso>;
  estudiante$!: Observable<Estudiantes[]>;
  estudiante!: Estudiantes[];
  estudiante2!: Array<Estudiantes[]>;
  nombreCurso!: string;
  constructor(
    private activateRoute: ActivatedRoute,
    private cursoService: CursosService,
    private estudianteService: EstudiantesService,

  ) { }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((parametros)=>{
      this.id= parseInt(parametros.get("id") || '0');
      this.curso$= this.cursoService.obtenerCurso(this.id);
    })
    this.estudiante$ = this.estudianteService.obtenerEstudiantes();

    this.estudiante$.subscribe((data)=>{
      this.estudiante2=[];

      this.cursoService.obtenerCurso(this.id).subscribe((data2)=>{

        this.nombreCurso=""+data2.nombre+" "+data2.comision;
        data.forEach((element,index) => {
          element.nombre_curso.forEach((element2) => {
            if(element2==this.nombreCurso){
              this.estudianteService.obtenerEstudiante(data[index].id).subscribe((data)=>{this.estudiante2.push(data)});
            }
          });
        });

      });
    })

  }

}
