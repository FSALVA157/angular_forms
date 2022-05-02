import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  persona = {
    nombre: "",
    apellido: "",
    correo: ""
  }

  constructor() { }

  ngOnInit(): void {
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
