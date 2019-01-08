import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

import { DurationInputComponent } from './duration-input.component';
import { DurationPipe } from '../../pipes/duration/duration.pipe';
import { ValidationService } from 'src/app/modules/core/services/validation/validation.service';

describe('DurationInputComponent', () => {
  let component: DurationInputComponent;
  let fixture: ComponentFixture<DurationInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [DurationInputComponent, DurationPipe],
      providers: [ValidationService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DurationInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
