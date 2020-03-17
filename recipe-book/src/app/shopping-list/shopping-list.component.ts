import { Component, OnInit, OnDestroy } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { Subscription, Observable } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
    ingredients: Observable<{ ingredients: Ingredient[] }>;

    constructor(
        private loggingService: LoggingService,
        private store: Store<fromApp.AppState>
    ) {}

    ngOnInit() {
        this.ingredients = this.store.select('shoppingList');
    }

    onEditItem(index: number) {
        this.store.dispatch(ShoppingListActions.startEdit({index}));
    }
}
