import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDetailPageComponent } from './add-detail-page.component';

describe('AddDetailPageComponent', () => {
  let component: AddDetailPageComponent;
  let fixture: ComponentFixture<AddDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDetailPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
