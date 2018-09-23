import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output } from '@angular/core';
import { Card } from '../shared/card';
import { CardService } from '../shared/card.service';
import { DragulaService } from 'ng2-dragula';

@Component({
  selector: 'app-board-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() card: Card;
  @Output() cardUpdate: EventEmitter<Card> = new EventEmitter<Card>();
  editingCard = false;
  currentTitle: string;
  zone: NgZone;

  /**
   *
   * @param {ElementRef} el
   * @param {ChangeDetectorRef} ref
   * @param {CardService} cardService
   */
  constructor(private el: ElementRef,
              private ref: ChangeDetectorRef,
              private cardService: CardService) {
    this.zone = new NgZone({enableLongStackTrace: false});
  }

  ngOnInit() {
  }

  /**
   *
   * @param event
   */
  blurOnEnter(event) {
    if (event.keyCode === 13) {
      event.target.blur();
    } else if (event.keyCode === 27) {
      this.card.title = this.currentTitle;
      this.editingCard = false;
    }
  }

  /**
   * editCard
   */
  editCard() {
    this.editingCard = true;
    this.currentTitle = this.card.title;

    const textArea = this.el.nativeElement.getElementsByTagName('textarea')[0];

    setTimeout(function () {
      textArea.focus();
    }, 0);
  }

  /**
   * update Card
   */
  updateCard() {
    if (!this.card.title || this.card.title.trim() === '') {
      this.card.title = this.currentTitle;
    }

    this.cardService.updateCard(this.card)
      .then(res => {
      }, (err) => {
        console.error(err);
      });
    this.editingCard = false;
  }
}
