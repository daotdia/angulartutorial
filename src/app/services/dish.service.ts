import { Injectable } from '@angular/core';
import {Dish} from "../share/dish"
import {Observable, of, pipe} from 'rxjs';
import {delay} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../share/baseurl';
import {map, catchError}  from 'rxjs/operators';
import {ProcessFTTPMsgService} from '../services/process-fttpmsg.service'



@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient,  
    private ProcessFTTPMsgService: ProcessFTTPMsgService) { }

  getDishes(): Observable<Dish[]>{
    return this.http.get<Dish[]>(baseURL + 'dishes').pipe(catchError(this.ProcessFTTPMsgService.handleError));
  }

  getDish(id: string): Observable<Dish> {
    return this.http.get<Dish>(baseURL + 'dishes/' + id).pipe(catchError(this.ProcessFTTPMsgService.handleError));
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get<Dish>(baseURL + 'dishes?featured=true')
      .pipe(map(dishes => dishes[0]))
      .pipe(catchError(this.ProcessFTTPMsgService.handleError));;
  }

  getDishIds(): Observable<string[] | any>{
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)))
      .pipe(catchError(error => error));;
  }

  putDish(dish: Dish):Observable<Dish>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.put<Dish>(baseURL + 'dishes/' + dish.id, dish, httpOptions);
    
  }
}
