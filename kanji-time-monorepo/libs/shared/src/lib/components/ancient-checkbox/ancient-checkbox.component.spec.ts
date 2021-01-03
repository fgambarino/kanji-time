import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AncientCheckboxComponent } from './ancient-checkbox.component';

describe('AncientCheckboxComponent', () => {
  let component: AncientCheckboxComponent;
  let fixture: ComponentFixture<AncientCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AncientCheckboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AncientCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
