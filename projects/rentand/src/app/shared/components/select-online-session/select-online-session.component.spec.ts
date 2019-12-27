import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SelectOnlineSessionComponent } from './select-online-session.component';


describe('SelectOnlineSessionComponent', () => {
  let component: SelectOnlineSessionComponent;
  let fixture: ComponentFixture<SelectOnlineSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectOnlineSessionComponent],
      imports: [
        MatSelectModule,
        MatFormFieldModule,
        FormsModule,
        NoopAnimationsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectOnlineSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
