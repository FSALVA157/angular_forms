import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }


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


}

