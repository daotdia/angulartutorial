import { Injectable } from '@angular/core';
import {Leader} from '../share/leader';
import {LEADERS} from '../share/leaders'

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(): Promise<Leader[]>{
    return new Promise(resolve => {
      //Simulate server latency with  seconds delay
      setTimeout(() => resolve(LEADERS), 2000);
    });
  }

  getLeader(id: string): Promise<Leader> {
    return new Promise(resolve => {
      //Simulate server latency with  seconds delay
      setTimeout(() => resolve(LEADERS.filter((leader) => (leader.id === id))[0]), 2000);
    }); 
  }

  getFeaturedLeader(): Promise<Leader>{
    return new Promise(resolve => {
      //Simulate server latency with  seconds delay
      setTimeout(() => resolve(LEADERS.filter((lead) => lead.featured)[0]), 2000);
    }); 
  }
}
