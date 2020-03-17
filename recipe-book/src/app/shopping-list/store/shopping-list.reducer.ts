import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface State {
    ingredients: Ingredient[];
    editedIngreditent: Ingredient;
    editedIngreditentIndex: number;
}

const initialState: State = {
    ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
    editedIngreditent: null,
    editedIngreditentIndex: -1,
};

export function shoppingListReducer(
    state = initialState,
    action: ShoppingListActions.ShoppingListActions
) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload],
            };
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload],
            };
        case ShoppingListActions.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[state.editedIngreditentIndex];
            const updatedIngredient = {
                ...ingredient,
                ...action.payload,
            };
            const updatedIngredients = [...state.ingredients];
            updatedIngredients[
                state.editedIngreditentIndex
            ] = updatedIngredient;
            return {
                ...state,
                ingredients: updatedIngredients,
                editedIngreditentIndex: -1,
                editedIngreditent: null,
            };
        case ShoppingListActions.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter((ig, igIndex) => {
                    return igIndex !== state.editedIngreditentIndex;
                }),
                editedIngreditentIndex: -1,
                editedIngreditent: null,
            };
        case ShoppingListActions.START_EDIT:
            return {
                ...state,
                editedIngreditentIndex: action.payload,
                editedIngreditent: { ...state.ingredients[action.payload] },
            };
        case ShoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedIngreditentIndex: -1,
                editedIngreditent: null,
            };
        default: {
            return state;
        }
    }
}
