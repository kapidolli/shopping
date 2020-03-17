import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export const SET_RECIPES = '[Recepies] Set Recipes';
export const FETCH_RECIPES = '[Recepies] Fetch Recipes';
export const ADD_RECIPE = '[Recepies] Add Recipe';
export const UPDATE_RECIPE = '[Recepies] Update Recipe';
export const DELETE_RECIPE = '[Recepies] Delete Recipe';
export const STORE_RECIPES = '[Recepies] Store Recipes';

export class SetRecipes implements Action {
    readonly type = SET_RECIPES;

    constructor(public payload: Recipe[]) {}
}

export class FetchRecipes implements Action {
    readonly type = FETCH_RECIPES;
}

export class AddRecipes implements Action {
    readonly type = ADD_RECIPE;

    constructor(public payload: Recipe) {}
}

export class UpdateRecipes implements Action {
    readonly type = UPDATE_RECIPE;

    constructor(public payload: { index: number; recipe: Recipe }) {}
}

export class DeleteRecipes implements Action {
    readonly type = DELETE_RECIPE;

    constructor(public payload: number) {}
}

export class StoreRecipes implements Action {
    readonly type = STORE_RECIPES;
}

export type RecipesActions =
    | SetRecipes
    | FetchRecipes
    | AddRecipes
    | UpdateRecipes
    | DeleteRecipes
    | StoreRecipes;
