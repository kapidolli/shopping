import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import * as RecipesActions from './recipe.actions';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipe.model';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class RecipeEffects {
    fetchRecipes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RecipesActions.fetchRecipes),
            switchMap(() => {
                return this.http.get<Recipe[]>(
                    'https://shopping-69aaa.firebaseio.com/recipes.json'
                );
            }),
            map(recipes => {
                return recipes.map(recipe => {
                    return {
                        ...recipe,
                        ingredients: recipe.ingredients
                            ? recipe.ingredients
                            : [],
                    };
                });
            }),
            map(recipes => {
                return RecipesActions.setRecipes({ recipes });
            })
        )
    );

    storeRecipes$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(RecipesActions.storeRecipes),
                withLatestFrom(this.store.select('recipes')),
                switchMap(([actionData, recipesState]) => {
                    return this.http.put(
                        'https://shopping-69aaa.firebaseio.com/recipes.json',
                        recipesState.recipes
                    );
                })
            ),
        { dispatch: false }
    );

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private store: Store<fromApp.AppState>
    ) {}
}
