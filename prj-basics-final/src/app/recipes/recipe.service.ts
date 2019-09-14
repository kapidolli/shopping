import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({ providedIn: 'root' })
export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe('Tasty Schnitzel',
         'A super-tasty Schnitzel  - just awesome!',
          // tslint:disable-next-line: max-line-length
          'https://www.thespruceeats.com/thmb/cckc3_4QUQ79kSFhcLPM8xg9F3g=/3797x2848/smart/filters:no_upscale()/wiener-schnitzel-recipe-1447089-Hero-5b587d6c46e0fb0071b0059d.jpg',
           [
               new Ingredient('Meat', 1),
               new Ingredient('French Fries', 20)
           ]),
        new Recipe('Big Fat Burger',
         'What else you need to say?',
         'https://www.thechunkychef.com/wp-content/uploads/2018/05/Juicy-Lucy-Cheese-Stuffed-Burgers-3-680x622.jpg',
          [
              new Ingredient('Buns', 2),
              new Ingredient('Meat', 1)
          ])
    ];

    constructor(private slService: ShoppingListService) {}

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
      return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }
}