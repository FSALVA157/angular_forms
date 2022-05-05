import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ValidadoresService } from 'src/app/services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _validadores: ValidadoresService
  ) {
    this.crearFormulario();
    this.setDataForm();
   }

  ngOnInit(): void {
  }

  crearFormulario(){
    this.forma = this.fb.group({
      apellido: ['', [Validators.required, Validators.minLength(5), this._validadores.noHerrera]],
      nombre  : ['',[Validators.required, Validators.minLength(5)]],
      correo  : ['', [Validators.required, Validators.minLength(5), Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      pass1  : ['',[Validators.required, Validators.minLength(5)]],
      pass2  : ['',[Validators.required, Validators.minLength(5)]],
      direccion: this.fb.group({
        provincia: ['', Validators.required],
        ciudad: ['', Validators.required],
      }),
      pasatiempos: this.fb.array([])
    });
  }

  setDataForm(){
    //this.forma.setValue({
      this.forma.reset({
            apellido: "Grondona",
            nombre: "Mariano",
            correo: "mgrondona@gmail.com",
            direccion:{
            provincia: "Salta",
            ciudad: "Capital"
            },
            pasatiempos: this.fb.array([])
    });
    ['primero', 'segundo', 'tercero'].forEach(valor => {this.pasatiempos.push(this.fb.control(valor))})
  }

  agregarPasatiempo(){
    this.pasatiempos.push(this.fb.control(''));
    //this.pasatiempos.push(this.fb.control('', Validators.required));
  }

  borrarPasatiempo(index: number){
    this.pasatiempos.removeAt(index);
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

  get pass1NoValido() {
    return this.forma.get('pass1')?.invalid && this.forma.get('pass1')?.touched;
  }

  get pass2NoValido() {
    const cont1 = this.forma.get('pass1')?.value;
    const cont2 = this.forma.get('pass2')?.value;
    return (cont1 === cont2)? false:true;

  }

  get provinciaNoValida() {
    return this.forma.get('direccion.provincia')?.invalid && this.forma.get('direccion.provincia')?.touched;
  }

  get ciudadNoValida() {
    return this.forma.get('direccion.ciudad')?.invalid && this.forma.get('direccion.provincia')?.touched;
  }

  get pasatiempos(){
    return this.forma.get('pasatiempos') as FormArray;
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
    this.forma.reset();
  }

}
