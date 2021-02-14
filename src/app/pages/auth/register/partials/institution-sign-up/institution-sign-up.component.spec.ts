import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionSignUpComponent } from './institution-sign-up.component';

describe('InstitutionSignUpComponent', () => {
  let component: InstitutionSignUpComponent;
  let fixture: ComponentFixture<InstitutionSignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InstitutionSignUpComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
