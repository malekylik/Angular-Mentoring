import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, debounceTime } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

import { DEBOUNCE_TIME } from 'src/app/constants/api';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class ToolboxComponent implements OnInit, OnDestroy {

  searchValue: FormControl = new FormControl('');

  @Output() search: EventEmitter<string> = new EventEmitter();
  @Output() addCourse: EventEmitter<void> = new EventEmitter();
 
  private searchChange$: Subject<string> = new Subject();

  constructor() { }

  ngOnInit() {
    const minSearchStringLength: number = 3;

    this.searchChange$
    .pipe(
      filter(str => str.length >= minSearchStringLength || str === ''),
      debounceTime(DEBOUNCE_TIME),
    )
    .subscribe(str => this.search.emit(str));
  }

  onSearch(): void {
    this.searchChange$.next(this.searchValue.value);
  }

  onAddCourse(): void {
    this.addCourse.emit();
  }

  ngOnDestroy() {
    this.searchChange$.complete();
  }
}
