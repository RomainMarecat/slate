import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';

export const MOCK_ACTION = '[MOCK] ACTION';
export const MOCK_STREAM = '[MOCK] Stream';

export class MockAction implements Action {
    readonly type = MOCK_ACTION;
    readonly payload: unknown;

    constructor(payload?: unknown) {
        this.payload = payload;
    }
}

export class MockStream implements Action {
    readonly type = MOCK_STREAM;
    readonly payload: {stream: Observable<unknown>};

    constructor(stream: Observable<unknown>) {
        this.payload = {stream};
    }
}
