import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';



@Injectable()
export class LoadingBlockService {

  private loadingBlockStatus: boolean = false;
  private loadingBlockStatus$: BehaviorSubject<boolean> = new BehaviorSubject(this.loadingBlockStatus);


  constructor(@Inject(DOCUMENT) private document: Document) { }

  showLoadingBlock(condition: boolean): void {
    if (this.loadingBlockStatus !== condition) {
      this.loadingBlockStatus = condition;

      if (condition) {
        this.document.body.style.overflow = 'hidden';
      } else {
        this.document.body.style.overflow = 'visible';
      }
  
      this.loadingBlockStatus$.next(condition);
    }
  }

  getLoadingBlockStatus(): Observable<boolean> {
    return this.loadingBlockStatus$.asObservable();
  }

}
