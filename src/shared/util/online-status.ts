import { Observable, fromEvent, merge } from 'rxjs';
import { map } from 'rxjs/operators';

export function onlineStatus$(): Observable<boolean> {
  return merge<boolean>(
    fromEvent(window, 'offline').pipe(map(() => false)),
    fromEvent(window, 'online').pipe(map(() => true)),
    new Observable(sub => {
      sub.next(navigator.onLine);
      sub.complete();
    }));
}
