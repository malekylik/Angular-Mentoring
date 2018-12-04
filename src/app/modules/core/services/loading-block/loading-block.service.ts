import { Injectable, ViewContainerRef, ComponentFactoryResolver, ComponentRef, ComponentFactory } from '@angular/core';

import { LoadingBlockComponent } from '../../components/loading-block/loading-block.component';

@Injectable()
export class LoadingBlockService {

  private rootViewContainer: ViewContainerRef;
  private loadingBlock: ComponentRef<LoadingBlockComponent>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  setRootViewContainerRef(viewContainerRef: ViewContainerRef): void {
    this.rootViewContainer = viewContainerRef;
  }

  showLoadingBlock(condition: boolean): void {
    if (condition) {
      if (!this.loadingBlock) {
        const factory: ComponentFactory<LoadingBlockComponent> = this.componentFactoryResolver
          .resolveComponentFactory(LoadingBlockComponent);
        this.loadingBlock = factory
          .create(this.rootViewContainer.parentInjector)
        this.rootViewContainer.insert(this.loadingBlock.hostView);
        this.rootViewContainer.element.nativeElement.parentElement.style.overflow = 'hidden';
      }
    } else {
      if (this.loadingBlock) {
        this.loadingBlock.destroy();
        this.loadingBlock = null;
        this.rootViewContainer.element.nativeElement.parentElement.style.overflow = 'visible';
      }
    }
  }
}
