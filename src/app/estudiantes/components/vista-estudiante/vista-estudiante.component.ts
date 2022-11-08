import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Estudiantes } from 'src/app/models/estudiantes';
import { EstudiantesService } from '../../services/estudiantes.service';
import { AgregarCursoComponent } from '../agregar-curso/agregar-curso.component';
import { QuitarCursoComponent } from '../quitar-curso/quitar-curso.component';

@Component({
  selector: 'app-vista-estudiante',
  templateUrl: './vista-estudiante.component.html',
  styleUrls: ['./vista-estudiante.component.css']
})
export class VistaEstudianteComponent implements OnInit {

  id!:number;
  listaEstudiantes$!: Observable<Estudiantes[]>;
  constructor(
    private activateRoute: ActivatedRoute,
    private estudianteService: EstudiantesService,
    private dialog: MatDialog,private _snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((parametros)=>{
      this.id= parseInt(parametros.get("id") || '0');
      this.listaEstudiantes$ = this.estudianteService.obtenerEstudiante(this.id);
    })
  }

  agregarCurso(id:number){
    let dialog =this.dialog.open(AgregarCursoComponent,{
      width: '550px',
      panelClass: 'custom-dialog-container',
      data: {id:id}
    });
    dialog.beforeClosed().subscribe(res=>{
      if(res.nombre_curso){
        this.estudianteService.agregarEstudianteCurso(id,res.nombre_curso);
        this._snackBar.open(`Agrego el curso ${res.nombre_curso} Exitosamente`, "Cerrar", {
          duration: 3000
        });
        this.router.navigate(['estudiantes/vista',{id:id}]);
      }
    })
  }
  quitarCurso(id:number){
    let dialog =this.dialog.open(QuitarCursoComponent,{
      width: '550px',
      panelClass: 'custom-dialog-container',
      data: {id:id}
    });
    dialog.beforeClosed().subscribe(res=>{
      if(res.nombre_curso){
        this.estudianteService.eliminarEstudianteCurso(id,res.nombre_curso,this.id);
        this._snackBar.open(`Elimino el curso ${res.nombre_curso} Exitosamente`, "Cerrar", {
          duration: 3000
        });
        this.router.navigate(['estudiantes/vista',{id:id}]);
      }
    })
  }

}
