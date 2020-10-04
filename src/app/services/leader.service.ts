import { Injectable } from '@angular/core';
import {Leader} from '../share/leader';
import {LEADERS} from '../share/leaders'
import {Observable, of} from 'rxjs';
import {delay} from 'rxjs/operators';
import { baseURL } from '../share/baseurl';
import {map, catchError}  from 'rxjs/operators';
import {ProcessFTTPMsgService} from '../services/process-fttpmsg.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient,  
    private ProcessFTTPMsgService: ProcessFTTPMsgService) { }

  getLeaders(): Observable<Leader[]>{
    return this.http.get<Leader[]>(baseURL + 'leadership').pipe(catchError(this.ProcessFTTPMsgService.handleError));
  }

  getLeader(id: string): Observable<Leader> {
    return this.http.get<Leader>(baseURL + 'leadership/' + id).pipe(catchError(this.ProcessFTTPMsgService.handleError));
  }

  getFeaturedLeader(): Observable<Leader>{
    return this.http.get<Leader>(baseURL + 'leadership/?featured=true')
      .pipe(map(leaders => leaders[0]))
      .pipe(catchError(this.ProcessFTTPMsgService.handleError));
  }
}
