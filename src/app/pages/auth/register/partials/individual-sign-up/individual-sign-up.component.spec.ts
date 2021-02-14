import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualSignUpComponent } from './individual-sign-up.component';

describe('IndividualSignUpComponent', () => {
  let component: IndividualSignUpComponent;
  let fixture: ComponentFixture<IndividualSignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IndividualSignUpComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
