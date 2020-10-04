import { Injectable } from '@angular/core';
import { Promotion } from '../share/promotion';
import { PROMOTIONS} from '../share/promotions';
import {Observable, of} from 'rxjs';
import {delay} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../share/baseurl';
import {map, catchError}  from 'rxjs/operators';
import {ProcessFTTPMsgService} from '../services/process-fttpmsg.service'

   
@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient,  
    private ProcessFTTPMsgService: ProcessFTTPMsgService) { }

  getPromotions(): Observable<Promotion[]>{
    return this.http.get<Promotion[]>(baseURL + 'promotions').pipe(catchError(this.ProcessFTTPMsgService.handleError));
  }

  getPromotion(id: string): Observable<Promotion>{
    return this.http.get<Promotion>(baseURL + 'promotions/' + id).pipe(catchError(this.ProcessFTTPMsgService.handleError));
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get<Promotion>(baseURL + 'promotions/?featured=true')
      .pipe(map(promos => promos[0]))
      .pipe(catchError(this.ProcessFTTPMsgService.handleError));
  }
}
