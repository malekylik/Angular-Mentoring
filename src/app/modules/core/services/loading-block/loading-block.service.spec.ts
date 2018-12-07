import { NgModule, Component, ViewContainerRef, OnInit } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { LoadingBlockService } from './loading-block.service';
import { LoadingBlockComponent } from '../../components/loading-block/loading-block.component';

@Component({
  template: '<app-host-component></app-host-component>',
})
class HostParentComponent {
}

@Component({
  selector: 'app-host-component',
  template: '',
})
class HostComponent implements OnInit {

  constructor(
    private viewContainerRef: ViewContainerRef,
    private loadingBlockService: LoadingBlockService) { }

  ngOnInit() {
    this.loadingBlockService.setRootViewContainerRef(this.viewContainerRef);
  }
}

@NgModule({
  imports: [MatProgressSpinnerModule],
  providers: [LoadingBlockService],
  declarations: [LoadingBlockComponent],
  entryComponents: [LoadingBlockComponent],
})
class TestModule { }

describe('LoadingBlockService', () => {
  let fixture: ComponentFixture<HostParentComponent>;
  let service: LoadingBlockService;

  beforeEach(async(() => {
    TestBed.configureTestingModule(<BrowserDynamicTestingModule>{
      imports: [TestModule],
      declarations: [HostParentComponent, HostComponent],
    }).compileComponents();

    service = TestBed.get(LoadingBlockService);
    fixture = TestBed.createComponent(HostParentComponent);
    fixture.detectChanges();
  }));

  it('should be created', () => {
    const service: LoadingBlockService = TestBed.get(LoadingBlockService);
    expect(service).toBeTruthy();
  });

  it('should render loading-block component', () => {
    service.showLoadingBlock(true);
    fixture.detectChanges();

    const loadingBlockElement = fixture.debugElement.query(By.css('app-loading-block')).nativeElement;

    expect(loadingBlockElement).toBeTruthy();
  });

  it('should render loading-block component only once', () => {
    service.showLoadingBlock(true);
    service.showLoadingBlock(true);
    fixture.detectChanges();

    const loadingBlockElements = fixture.debugElement.queryAll(By.css('app-loading-block'));

    expect(loadingBlockElements.length).toBe(1);
  });

  it('should remove loading-block component', () => {
    service.showLoadingBlock(true);
    fixture.detectChanges();

    service.showLoadingBlock(false);
    fixture.detectChanges();

    const loadingBlockElements = fixture.debugElement.queryAll(By.css('app-loading-block'));

    expect(loadingBlockElements.length).toBe(0);
  });
});
