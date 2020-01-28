import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialNetworkHookComponent } from './social-network-hook.component';

describe('SocialNetworkHookComponent', () => {
  let component: SocialNetworkHookComponent;
  let fixture: ComponentFixture<SocialNetworkHookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialNetworkHookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialNetworkHookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
