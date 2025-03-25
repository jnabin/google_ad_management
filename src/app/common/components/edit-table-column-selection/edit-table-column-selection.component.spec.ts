import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTableColumnSelectionComponent } from './edit-table-column-selection.component';

describe('EditTableColumnSelectionComponent', () => {
  let component: EditTableColumnSelectionComponent;
  let fixture: ComponentFixture<EditTableColumnSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTableColumnSelectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTableColumnSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
