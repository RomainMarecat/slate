import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { BoardRoutingModule } from '../board-routing.module';
import { DragulaModule } from 'ng2-dragula';
import { SharedModule } from 'shared/shared.module';
import { BoardService } from '../shared/board.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BoardListComponent } from '../board-list/board-list.component';
import { CommonModule } from '@angular/common';
import { ColumnComponent } from '../column/column.component';
import { BoardComponent } from '../board/board.component';
import { CardService } from '../shared/card.service';
import { ColumnService } from '../shared/column.service';
import { MockBoardService } from '../shared/mock-board.service';
import { MockColumnService } from '../shared/mock-column.service';
import { MockCardService } from '../shared/mock-card.service';
import { configureTestSuite } from 'shared/unit-test/configure-test-suite';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        DragulaModule,
        SharedModule,
        HttpClientTestingModule,
        BoardRoutingModule
      ],
      declarations: [
        CardComponent,
        ColumnComponent,
        BoardComponent,
        BoardListComponent
      ],
      providers: [
        {provide: BoardService, useClass: MockBoardService},
        {provide: ColumnService, useClass: MockColumnService},
        {provide: CardService, useClass: MockCardService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
