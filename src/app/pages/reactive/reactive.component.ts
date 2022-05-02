import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma!: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.crearFormulario();
   }

  ngOnInit(): void {
  }

  crearFormulario(){
    this.forma = this.fb.group({
        nombre  : ['Fernando Javier'],
        apellido: ['Salva'],
        correo  : ['xxavierargentino@hotmail.com']
    });
  }

  guardar(){
    console.log(this.forma);
  }

}
