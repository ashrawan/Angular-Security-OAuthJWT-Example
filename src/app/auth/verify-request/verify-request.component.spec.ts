import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyRequestComponent } from './verify-request.component';

describe('VerifyRequestComponent', () => {
  let component: VerifyRequestComponent;
  let fixture: ComponentFixture<VerifyRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
