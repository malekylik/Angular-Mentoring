import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { LoadingBlockComponent } from './loading-block.component';
import { LoadingBlockService } from '../../services/loading-block/loading-block.service';

@Component({
  template: '<app-loading-block></app-loading-block>',
})
class HostComponent {}

describe('LoadingBlockComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;
  let service: LoadingBlockService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatProgressSpinnerModule],
      providers: [LoadingBlockService],
      declarations: [LoadingBlockComponent, HostComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    service = TestBed.get(LoadingBlockService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render if LoadingBlockStatus == true', () => {
    service.showLoadingBlock(true);

    fixture.detectChanges();
    const loadingBlock = fixture.debugElement.query(By.css('.loading-block'));

    expect(loadingBlock).toBeTruthy();
  });

  it('should not render if LoadingBlockStatus == false', () => {
    const loadingBlock = fixture.debugElement.query(By.css('.loading-block'));

    expect(loadingBlock).toBeFalsy();
  });
});
