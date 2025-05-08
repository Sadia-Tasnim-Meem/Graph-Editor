import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnodedialogueComponent } from './addnodedialogue.component';

describe('AddnodedialogueComponent', () => {
  let component: AddnodedialogueComponent;
  let fixture: ComponentFixture<AddnodedialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddnodedialogueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddnodedialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
