import { Injectable } from '@angular/core';
import { Promotion } from '../share/promotion';
import { PROMOTIONS} from '../share/promotions';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  getPromotions(): Promise<Promotion[]>{
    return new Promise(resolve => {
      //Simulate server latency with  seconds delay
      setTimeout(() => resolve(PROMOTIONS), 2000);
    });
  }

  getPromotion(id: string): Promise<Promotion>{
    return new Promise(resolve => {
      //Simulate server latency with  seconds delay
      setTimeout(() => resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]), 2000);
    });
  }

  getFeaturedPromotion(): Promise<Promotion> {
    return new Promise(resolve => {
      //Simulate server latency with  seconds delay
      setTimeout(() => resolve(PROMOTIONS.filter((promo) => promo.featured)[0]), 2000);
    });
  }
}
