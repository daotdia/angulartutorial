import { Component, OnInit, Inject } from '@angular/core';
import {Dish} from '../share/dish';
import {DishService} from '../services/dish.service';
import { Promotion } from '../share/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../share/leader';
import { LeaderService } from '../services/leader.service';
import { InheritDefinitionFeature } from '@angular/core/src/render3';
import {flyInOut, expand} from '../animations/app.animation';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  dishErrMsg: string;
  leadErrMsg: string;
  promotionErrMsg: string;
  contact: Leader;

  constructor(private dishService: DishService,
    private promotionService: PromotionService,
    private leaderservice: LeaderService,
    @Inject('baseURL') BaseURL) { }

  ngOnInit() {
    this.dishService.getFeaturedDish()
     .subscribe((dish) => this.dish = dish,
      errmes => this.dishErrMsg = <any> errmes);
    this.promotionService.getFeaturedPromotion()
     .subscribe((promo) => this.promotion = promo);
    this.leaderservice.getFeaturedLeader()
     .subscribe((leader) => this.contact = leader);
  }

}
