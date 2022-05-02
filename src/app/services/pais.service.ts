import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor(
    private http:HttpClient
  ) { }

  getPaises(){
    return this.http.get<any[]>('http://api.countrylayer.com/v2/all?access_key=e803180d6c1b44a33aa4b0df41b6d470')
                        .pipe(
                          map((resp: any[]) => {
                             return resp.map(pais => {
                               return {
                                 nombre: pais.name,
                                 codigo: pais.alpha3Code
                               };
                             });
                            
                          })
                        )
    ;
  }
}
