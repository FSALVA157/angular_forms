import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
      apellido: ['', [Validators.required, Validators.minLength(5)]],
      nombre  : ['',[Validators.required, Validators.minLength(5)]],
      correo  : ['', [Validators.required, Validators.minLength(5), Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      direccion: this.fb.group({
        provincia: ['', Validators.required],
        ciudad: ['', Validators.required],
      })
    });
  }

  get nombreNoValido() {
    return this.forma.get('nombre')?.invalid && this.forma.get('nombre')?.touched;
  }

  get apellidoNoValido() {
    return this.forma.get('apellido')?.invalid && this.forma.get('apellido')?.touched;
  }

  get correoNoValido() {
    return this.forma.get('correo')?.invalid && this.forma.get('correo')?.touched;
  }

  get provinciaNoValida() {
    return this.forma.get('direccion.provincia')?.invalid && this.forma.get('direccion.provincia')?.touched;
  }

  get ciudadNoValida() {
    return this.forma.get('direccion.ciudad')?.invalid && this.forma.get('direccion.provincia')?.touched;
  }

  guardar(){
    console.log(this.forma);

    if(this.forma.invalid){
      return Object.values(this.forma.controls).forEach(control => {
        if(control instanceof FormGroup){
          Object.values(control.controls).forEach(control => {
            control.markAsTouched();
          })
        }else{
          control.markAsTouched();
        }
      });
    }
  }

}
