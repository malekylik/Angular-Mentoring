import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class ToolboxComponent implements OnInit {

  searchValue: string = "";

  @Output() search: EventEmitter<string> = new EventEmitter();
  @Output() addCourse: EventEmitter<void> = new EventEmitter();

  private searchChange$: Subject<string> = new Subject();

  constructor() { }

  ngOnInit() {
    const minSearchStringLength: number = 3;
    const debounceT: number = 500;

    this.searchChange$
    .pipe(
      filter(str => str.length >= minSearchStringLength || str === ''),
      debounceTime(debounceT),
    )
    .subscribe(str => this.search.emit(str));
  }

  onSearch(search: string = this.searchValue): void {
    this.searchChange$.next(search);
  }

  onAddCourse(): void {
    this.addCourse.emit();
  }
}
