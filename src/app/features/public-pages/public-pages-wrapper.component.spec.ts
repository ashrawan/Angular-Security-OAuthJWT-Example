import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicPagesWrapperComponent } from './public-pages-wrapper.component';

describe('PublicPagesWrapperComponent', () => {
  let component: PublicPagesWrapperComponent;
  let fixture: ComponentFixture<PublicPagesWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicPagesWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicPagesWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
