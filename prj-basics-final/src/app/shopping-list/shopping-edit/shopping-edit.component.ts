import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput', {static: true}) nameInput: ElementRef;
  @ViewChild('amountInput', {static: true}) amountInput: ElementRef;
  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit() {
  }

  addIngredient() {
    const newIngredient = new Ingredient(this.nameInput.nativeElement.value, this.amountInput.nativeElement.value);
    this.ingredientAdded.emit(newIngredient);
    console.log(this.nameInput.nativeElement.value);
  }
}
