import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { ReducerManager, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppState } from '../app.state';
import { createMockReducer } from './mock-reducer';
import { MockEffect } from './mock-effect';
import { appReducers } from '../app.reducer';

export function initReducer(featureName: string, initialState: unknown) {
    return (reducer: ReducerManager) => {
        return () => new Promise((resolve) => {
            reducer.addReducer(featureName, createMockReducer(initialState));
            resolve('mocked reducer');
        });
    };
}

@NgModule({
    imports: [
        StoreModule.forRoot(
            appReducers,
            {
                // Permet de supprimer les warnings
                runtimeChecks: {
                    strictActionImmutability: true,
                    strictStateImmutability: true
                }
            }
        ),
        EffectsModule.forRoot([MockEffect])
    ],
    exports: [
        StoreModule
    ],
})
export class MockStoreModule {
    static forRoot(featureName: string, initialState: Partial<AppState>): ModuleWithProviders {
        return {
            ngModule: MockStoreModule,
            providers: [
                {provide: APP_INITIALIZER, useFactory: initReducer(featureName, initialState), deps: [ReducerManager], multi: true},
            ],
        };
    }
}
