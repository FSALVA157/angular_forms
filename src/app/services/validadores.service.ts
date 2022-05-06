import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

interface IErrorValidate{
  [s:string]: boolean
}


@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }


  existeUsuario(control: FormControl): Promise<IErrorValidate | null> | Observable<IErrorValidate>{
    return new Promise((resolve, reject) => {
        setTimeout(() => {
          if(control.value === "xxavier"){
            resolve({
              existe: true
            });
          }else{
            resolve(null);
          }
        }, 3500);
    })
  }
  noHerrera(control: FormControl): {[s:string]: boolean} | null{

    if((control.value.toLowerCase() === "herrera") && control.value != null){
      return {
        noHerrera: true
      }
    }
    return null;
    // return {
    //   noHerrera: false
    // };

  }

  passwordIguales(pass1ControlName: string, pass2ControlName: string){
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.controls[pass1ControlName];
      const pass2Control = formGroup.controls[pass2ControlName];
      if(pass1Control.value === pass2Control.value){
        pass2Control.setErrors(null);
      }else{
        pass2Control.setErrors({
          noEsIgual: true
        });
      }

    }
  }


}

