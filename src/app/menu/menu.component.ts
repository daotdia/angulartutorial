import { Component, OnInit, Inject} from '@angular/core';
import { Dish } from '../share/dish';
import {DishService} from '../services/dish.service'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  dishes: Dish[];
  errMsg: string;
  
  constructor(private dishService: DishService,
    @Inject('baseURL') private BaseURL) {}

  ngOnInit() { 
    this.dishService.getDishes()
    .subscribe((dishes) => this.dishes=dishes,
      errmess => this.errMsg = <any>errmess);
  }
}
