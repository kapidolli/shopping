import { Component, OnInit, OnDestroy } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
    ingredients: Ingredient[];
    private subscription: Subscription;

    constructor(private shoppingListService: ShoppingListService, private loggingService: LoggingService) {}

    ngOnInit() {
        this.ingredients = this.shoppingListService.getIngredients();
        /* this.shoppingListService.ingredientAdded.subscribe(
      (newIngredient: Ingredient) => {
        this.ingredients.push(newIngredient);
      }
    ); */
        this.subscription = this.shoppingListService.ingredientsChanged.subscribe(
            (ingredients: Ingredient[]) => {
                this.ingredients = ingredients;
            }
        );

        this.loggingService.printLog('Hello from ShoppingList');
    }

    onEditItem(index: number) {
      this.shoppingListService.startedEditing.next(index);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
