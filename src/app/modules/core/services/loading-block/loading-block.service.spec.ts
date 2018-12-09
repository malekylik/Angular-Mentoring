import { Component } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { LoadingBlockService } from './loading-block.service';
import { LoadingBlockComponent } from '../../components/loading-block/loading-block.component';

@Component({
  template: '<app-loading-block></app-loading-block>',
})
class HostComponent {}

describe('LoadingBlockService', () => {
  let fixture: ComponentFixture<HostComponent>;
  let service: LoadingBlockService;

  beforeEach(async(() => {
    TestBed.configureTestingModule(<BrowserDynamicTestingModule>{
      imports: [MatProgressSpinnerModule],
      providers: [LoadingBlockService],
      declarations: [HostComponent, LoadingBlockComponent],
    }).compileComponents();

    service = TestBed.get(LoadingBlockService);
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  }));

  it('should be created', () => {
    const service: LoadingBlockService = TestBed.get(LoadingBlockService);
    expect(service).toBeTruthy();
  });

  describe('showLoadingBlock should return Observable<boolean>', () => {
    it('should be true when showLoadingBlock(true)', () => {
      let first: boolean = true;

      service.getLoadingBlockStatus()
      .subscribe((loading: boolean) => {
        if (!first) {
          expect(loading).toBeTruthy();
        } else {
          first = false;
        }
      });

      service.showLoadingBlock(true);
    });

    it('should be true when showLoadingBlock(false)', () => {
      let first: boolean = true;

      service.getLoadingBlockStatus()
      .subscribe((loading: boolean) => {
        if (!first) {
          expect(loading).toBeFalsy();
        } else {
          first = false;
        }
      });

      service.showLoadingBlock(false);
    });
  });
});
