import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardComponent } from './board.component';
import { BoardRoutingModule } from '../board-routing.module';
import { DragulaModule } from 'ng2-dragula';
import { SharedModule } from 'shared/shared.module';
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
import { MockAlertService } from 'shared/popup/mock-alert.service';
import { AlertService } from 'shared/popup/alert.service';
import { ObjectService } from 'shared/util/object.service';
import { configureTestSuite } from 'shared/unit-test/configure-test-suite';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        DragulaModule,
        SharedModule,
        HttpClientTestingModule,
        RouterTestingModule,
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
        {provide: CardService, useClass: MockCardService},
        {provide: AlertService, useClass: MockAlertService},
        ObjectService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
