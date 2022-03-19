import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionsWrapperComponent } from './solutions-wrapper.component';

describe('SolutionsWrapperComponent', () => {
  let component: SolutionsWrapperComponent;
  let fixture: ComponentFixture<SolutionsWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolutionsWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolutionsWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
