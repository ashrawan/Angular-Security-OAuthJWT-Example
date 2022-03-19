import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceSearchComponent } from './service-search.component';

describe('ServiceSearchComponent', () => {
  let component: ServiceSearchComponent;
  let fixture: ComponentFixture<ServiceSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
