import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Clothing } from './../../shared/clothing/clothing';
import { IClothing } from './../../shared/clothing/i-clothing';
import { UserService } from './../../shared/user/user.service';
import { ScoreService } from './../../shared/score/score.service';
import { Score } from './../../shared/score/score';
import { AlertService } from './../../shared/alert/alert.service';

@Component({
  selector: 'app-clothing-action',
  templateUrl: './clothing-action.component.html',
  styleUrls: ['./clothing-action.component.scss']
})
export class ClothingActionComponent implements OnInit {

  @Input() clothing: IClothing;
  @Output() updateScore: EventEmitter < IClothing > = new EventEmitter < IClothing > ();

  constructor(private userService: UserService, private scoreService: ScoreService,
    private alertService: AlertService) {}

  ngOnInit() {}

  /**
   * Add +1 or -1 on current score
   * Test if User is authenticated, is Authorized (First time score this item)
   * If test is true, update IClothing
   * @param {IClothing} clothing
   * @param {string}    score    string plus or minus
   * @todo Update plus or minus string by new alogrithm
   */
  score(clothing: IClothing, score: string) {
    this.userService.isAuthenticated().subscribe((authenticated) => {
      if (authenticated) {
        this.scoreService.filterByClothing(clothing.key);
        this.scoreService.filterByUser(this.userService.getUser().uid);
        this.scoreService.isAuthorized().subscribe((authorized) => {
          if (authorized) {
            this.updateClothingScore(clothing, score);
          } else {
            this.alertService.toast('Vous avez déjà voté', 'error');
          }
        }, (err) => {
          this.alertService.toast('Nous ne sommes pas en mesure de savoir si vous avez voté, veuillez recommencer.', 'error');
        });
      } else {
        this.alertService.toast('Il faut se connecter pour pouvoir voter', 'error');
      }
    }, (err) => {
      this.alertService.toast('Vous n\'avons pas retrouvé votre utilisateur', 'error');
    });
  }

  /**
   * Create new score in the collection with user id
   * Update the clothing
   * @param {IClothing} clothing
   * @param {string}    score
   */
  updateClothingScore(clothing: IClothing, score: string) {
    if (!clothing.score) {
      clothing.score = 0;
    }
    if (score === 'plus') {
      clothing.score++;
    } else {
      clothing.score--;
    }
    const newScore = {
      created_at: new Date(),
      user: this.userService.getUser().uid,
      clothing: clothing.key
    };
    this.scoreService.createScore(newScore);
    this.updateScore.emit(clothing);
  }
}
