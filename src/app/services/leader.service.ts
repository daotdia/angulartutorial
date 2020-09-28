import { Injectable } from '@angular/core';
import {Leader} from '../share/leader';
import {LEADERS} from '../share/leaders'

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders():Leader[]{
    return LEADERS;
  }

  getFeaturedLeader(): Leader{
    return LEADERS.filter((lead) => lead.featured)[0];
  }
}
