import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardRoutingModule } from '../board-routing.module';
import { BoardListComponent } from '../board-list/board-list.component';
import { CommonModule } from '@angular/common';
import { ColumnComponent } from '../column/column.component';
import { CardComponent } from '../card/card.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BoardService } from '../shared/board.service';
import { CardService } from '../shared/card.service';
import { ColumnService } from '../shared/column.service';
import { MockBoardService } from '../shared/mock-board.service';
import { MockColumnService } from '../shared/mock-column.service';
import { MockCardService } from '../shared/mock-card.service';
import { RouterTestingModule } from '@angular/router/testing';
import { BoardDetailComponent } from './board-detail.component';
import { configureTestSuite } from '../../unit-test/configure-test-suite';
import { SharedModule } from '../../shared.module';
import { AlertService } from '../../popup/alert.service';
import { ObjectService } from '../../util/object.service';
import { MockAlertService } from '../../popup/mock-alert.service';
import { BoardComponent } from '../board/board.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

describe('BoardDetailComponent', () => {
  let component: BoardDetailComponent;
  let fixture: ComponentFixture<BoardDetailComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        DragDropModule,
        SharedModule,
        HttpClientTestingModule,
        RouterTestingModule,
        BoardRoutingModule
      ],
      declarations: [
        CardComponent,
        ColumnComponent,
        BoardComponent,
        BoardDetailComponent,
        BoardListComponent
      ],
      providers: [
        {provide: BoardService, useClass: MockBoardService},
        {provide: ColumnService, useClass: MockColumnService},
        {provide: CardService, useClass: MockCardService},
        {provide: AlertService, useClass: MockAlertService},
        ObjectService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
