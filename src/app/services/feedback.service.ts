import { Injectable } from '@angular/core';
import {Feedback} from "../share/feedback"
import {Observable, of, pipe} from 'rxjs';
import {delay} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../share/baseurl';
import {map, catchError}  from 'rxjs/operators';
import {ProcessFTTPMsgService} from '../services/process-fttpmsg.service'


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient) { }

  submitFeedback (feedback: Feedback):Observable<Feedback>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<Feedback>(baseURL + 'feedback/', feedback, httpOptions);
  }
}
