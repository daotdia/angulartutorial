import { Component, OnInit } from '@angular/core';
import {Dish} from '../share/dish';
import {DishService} from '../services/dish.service';
import { Promotion } from '../share/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../share/leader';
import { LeaderService } from '../services/leader.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  contact: Leader;

  constructor(private dishService: DishService,
    private promotionService: PromotionService,
    private leaderservice: LeaderService) { }

  ngOnInit() {
    this.dishService.getFeaturedDish()
     .then((dish) => this.dish = dish);
    this.promotionService.getFeaturedPromotion()
     .then((promo) => this.promotion = promo);
    this.leaderservice.getFeaturedLeader()
     .then((leader) => this.contact = leader);
  }

}
