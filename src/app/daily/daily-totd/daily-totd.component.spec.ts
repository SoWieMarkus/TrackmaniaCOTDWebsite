import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyTotdComponent } from './daily-totd.component';

describe('DailyTotdComponent', () => {
  let component: DailyTotdComponent;
  let fixture: ComponentFixture<DailyTotdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyTotdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyTotdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
