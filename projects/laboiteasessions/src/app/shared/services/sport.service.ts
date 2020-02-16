import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Sport } from '../interfaces/sport';
import { environment } from '../../../environments/environment';
// import gql from 'graphql-tag';
// import { Apollo } from 'apollo-angular';
import { tap } from 'rxjs/operators';
//
// const GET_SPORTS = gql`
//   {
//     sports {
//       id
//       name
//     }
//   }
// `;


@Injectable({
  providedIn: 'root'
})
export class SportService {
  url = `${environment.middleware}/v1/public/sports`;

  sportsLevels$: Map<number, BehaviorSubject<Sport[]>> = new Map<number, BehaviorSubject<Sport[]>>(
    [
      [0, new BehaviorSubject<Sport[]>([])],
      [1, new BehaviorSubject<Sport[]>([])],
      [2, new BehaviorSubject<Sport[]>([])],
      [3, new BehaviorSubject<Sport[]>([])],
      [4, new BehaviorSubject<Sport[]>([])],
    ]
  );
  sport$: BehaviorSubject<Sport> = new BehaviorSubject<Sport>(null);

  //  private apollo: Apollo
  constructor(private http: HttpClient,
  ) {
  }

  // getSportsGraphQL(): Observable<Sport[]> {
  //   return this.apollo
  //     .watchQuery({
  //       query: GET_SPORTS,
  //     })
  //     .valueChanges.pipe(map(result => result.data && result.data as Sport[]));
  // }


  getSports(level: number): Observable<Sport[]> {
    let url = `${this.url}?level=${level}`;
    if (this.sport$.getValue()) {
      url = url + `&sport=${this.sport$.getValue().id}`;
    }

    return this.http.get<Sport[]>(url)
      .pipe(
        tap((sports) => {
          for (let i = 0; i <= 4; i++) {
            if (i > level) {
              this.sportsLevels$.get(i).next([]);
            }
          }
          this.sportsLevels$.get(level).next(sports);
        })
      );
  }

  getSport(slug: string): Observable<Sport> {
    return this.http.get<Sport>(`${this.url}/${slug}`);
  }

  announceSportLevelChange(level: number, sport: Sport) {
    this.sport$.next(sport);
    this.getSports(level + 1).subscribe();
  }
}
