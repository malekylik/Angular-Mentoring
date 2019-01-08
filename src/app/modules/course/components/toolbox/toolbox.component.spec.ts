import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';

import { ToolboxComponent } from './toolbox.component';

describe('ToolboxComponent', () => {
  let component: ToolboxComponent;
  let fixture: ComponentFixture<ToolboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, FormsModule, MatDialogModule ],
      declarations: [ ToolboxComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start searching on search button click', () => {
    spyOn(component, 'onSearch');
    fixture.debugElement.query(By.css('form')).triggerEventHandler('submit', null);

    expect(component.onSearch).toHaveBeenCalled();
  });

  it('should emit search event if string length equal or greater than 3', () => {
    const searchString: string = 'asd';
    component.searchValue.setValue(searchString);

    spyOn(component.search, 'emit');
    fixture.debugElement.query(By.css('form')).triggerEventHandler('submit', null);

    component.search.subscribe((search) => {
      expect(search).toEqual(searchString);
    });
  });

  it('should not emit search event if string length less than 3', () => {
    component.searchValue.setValue('as');

    spyOn(component.search, 'emit');
    fixture.debugElement.query(By.css('form')).triggerEventHandler('submit', null);
    fixture.detectChanges();

    expect(component.search.emit).toHaveBeenCalledTimes(0);
  });

  it('should emit search event after 500 milliseconds', fakeAsync(() => {
    component.searchValue.setValue('asd');

    spyOn(component.search, 'emit');
    fixture.debugElement.query(By.css('form')).triggerEventHandler('submit', null);
    fixture.detectChanges();

    tick(500);

    expect(component.search.emit).toHaveBeenCalled();
  }));
});
