import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AncientButtonComponent } from './ancient-button.component';

describe('AncientButtonComponent', () => {
  let component: AncientButtonComponent;
  let fixture: ComponentFixture<AncientButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AncientButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AncientButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
