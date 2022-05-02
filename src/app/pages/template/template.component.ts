import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from 'src/app/services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  persona = {
    nombre: "Fernando Javier",
    apellido: "Salva",
    correo: "xxavierargentino@hotmail.com",
    pais: ""
  };
  paises: any[]=[];

  constructor(
    private _paisesService: PaisService
  ) { }

  ngOnInit(): void {
    this._paisesService.getPaises().subscribe(paises =>{
      this.paises = paises;
      this.paises.unshift({
        pais:'[seleccione un pais]',
        codigo:""
      });
      console.log(this.paises)
    });
  }

  guardarForm(forma: NgForm){
    if(forma.invalid){
      Object.values(forma.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }
    console.log(forma.value);
  }

}
