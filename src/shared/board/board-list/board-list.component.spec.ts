import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardListComponent } from './board-list.component';
import { BoardRoutingModule } from '../board-routing.module';
import { BoardService } from '../shared/board.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { ColumnComponent } from '../column/column.component';
import { CardService } from '../shared/card.service';
import { CardComponent } from '../card/card.component';
import { ColumnService } from '../shared/column.service';
import { MockBoardService } from '../shared/mock-board.service';
import { MockColumnService } from '../shared/mock-column.service';
import { MockCardService } from '../shared/mock-card.service';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalizeRouterModule, LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { SharedModule } from '../../shared.module';
import { configureTestSuite } from '../../unit-test/configure-test-suite';
import { BoardDetailComponent } from '../board-detail/board-detail.component';
import { MockLocalizeRouterService } from '../../router/mock-localize-router.service';
import { BoardComponent } from '../board/board.component';
import { SeoModule } from '../../seo/seo.module';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { DragDropModule } from '@angular/cdk/drag-drop';

describe('BoardListComponent', () => {
  let component: BoardListComponent;
  let fixture: ComponentFixture<BoardListComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        DragDropModule,
        SharedModule,
        HttpClientTestingModule,
        LocalizeRouterModule,
        RouterTestingModule,
        SeoModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
        LocalizeRouterModule,
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
        {provide: LocalizeRouterService, useClass: MockLocalizeRouterService},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
