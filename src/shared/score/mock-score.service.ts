import { of } from 'rxjs/index';

export class MockScoreService {
  getScores() {
    return of({
      key: '154632',
      user: '165123',
      product: '515215',
      created_at: new Date()
    });
  }
}
