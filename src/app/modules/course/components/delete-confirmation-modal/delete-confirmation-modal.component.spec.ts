import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';

import { DeleteConfirmationModalComponent } from './delete-confirmation-modal.component';

describe('DeleteConfirmationModalComponent', () => {
  let component: DeleteConfirmationModalComponent;
  let fixture: ComponentFixture<DeleteConfirmationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatDialogModule ],
      declarations: [ DeleteConfirmationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
