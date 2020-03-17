import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
    @ViewChild('f', { static: true }) slForm: NgForm;
    subscription: Subscription;
    editMode = false;
    editedItem: Ingredient;

    constructor(
        private store: Store<fromApp.AppState>
    ) {}

    ngOnInit() {
        this.subscription = this.store
            .select('shoppingList')
            .subscribe(stateData => {
                if (stateData.editedIngreditentIndex > -1) {
                    this.editMode = true;
                    this.editedItem = stateData.editedIngreditent;
                    this.slForm.setValue({
                        name: this.editedItem.name,
                        amount: this.editedItem.amount,
                    });
                } else {
                    this.editMode = false;
                }
            });
        /*
          this.subscription = this.shoppingListService.startedEditing.subscribe(
              (index: number) => {
                  this.editedItemIndex = index;
                  this.editMode = true;
                  this.editedItem = this.shoppingListService.getIngredient(index);
                  this.slForm.setValue({
                      name: this.editedItem.name,
                      amount: this.editedItem.amount,
                  });
              }
          );
        */
    }

    onSubmit(form: NgForm) {
        const value = form.value;
        const newIngredient = new Ingredient(value.name, value.amount);
        // this.shoppingListService.ingredientAdded.emit(newIngredient);
        if (this.editMode) {
            /*  this.shoppingListService.updateIngredient(
                  this.editedItemIndex,
                  newIngredient
                );
            */
            this.store.dispatch(
                new ShoppingListActions.UpdateIngredient(newIngredient)
            );
        } else {
            //  this.shoppingListService.addIngredient(newIngredient);
            this.store.dispatch(
                new ShoppingListActions.AddIngredient(newIngredient)
            );
        }
        this.editMode = false;
        form.reset();
    }

    clear() {
        this.editMode = false;
        this.slForm.reset();
        this.store.dispatch(new ShoppingListActions.StopEdit());
    }

    onDelete() {
        // this.shoppingListService.deleteIngredient(this.editedItemIndex);
        this.store.dispatch(new ShoppingListActions.DeleteIngredient());
        this.clear();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.store.dispatch(new ShoppingListActions.StopEdit());
    }
}
