import { Component, OnInit, Input, ViewChild, Inject} from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { formatDate, Location } from '@angular/common';
import { Dish } from '../share/dish';
import {DishService} from '../services/dish.service'
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../share/comment';
import {MatSlider, MatSliderModule} from '@angular/material/slider';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  slider: MatSlider;
  errMsg: string;

  feedbackForm: FormGroup;
  comment: Comment;
  @ViewChild('fform') feedbackFormDirective;

  formErrors = {
    'author': '',
    'rating': '',
    'comment': '',
    'date': ''
  };

  validationMessages = {
    'author': {
      'required':      'Name is required.',
      'minlength':     ' Name must be at least 2 characters long.'
    },
    'comment': {
      'required':      'Comment is required.',
    }
  };

  constructor(private dishService: DishService,
    private location: Location,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    @Inject('baseURL') private BaseURL) 
    {  
      this.createForm();
    }

    createForm(){
      this.feedbackForm = this.fb.group({
        author: ['', [Validators.required , Validators.minLength(2), Validators.maxLength(25)] ],
        rating: [5],
        comment: ['', Validators.required],
        date: ['']
      });
  
      this.feedbackForm.valueChanges
       .subscribe(data => this.onValueChanged(data));
      
       this.onValueChanged();
    }

  ngOnInit() {
    this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
      this.route.params.pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
      .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id);},
        errmess => this.errMsg = <any>errmess);
    }

    setPrevNext(dishId: string) {
      const index = this.dishIds.indexOf(dishId);
      this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
      this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
    }

  goBack(): void {
    this.location.back();
  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit(){
    this.dish.comments.push({
      rating: this.feedbackForm.get('rating').value, 
      comment: this.feedbackForm.get('comment').value, 
      author: this.feedbackForm.get('author').value,
      date: formatDate(Date.now(),'mediumDate','en-US')
      });

    this.comment = this.feedbackForm.value;
    console.log(this.comment);
    this.feedbackFormDirective.resetForm();
    this.feedbackForm.reset({
      author: '',
      rating: [5],
      comment: '',
      date: '',
    });
  }
}
