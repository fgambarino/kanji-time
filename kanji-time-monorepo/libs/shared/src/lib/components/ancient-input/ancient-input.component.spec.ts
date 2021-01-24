import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AncientInputComponent } from './ancient-input.component';

describe('AncientInputComponent', () => {
  let component: AncientInputComponent;
  let fixture: ComponentFixture<AncientInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AncientInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AncientInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
