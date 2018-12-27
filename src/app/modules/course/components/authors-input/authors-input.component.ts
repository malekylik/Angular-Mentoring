import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { switchMap, debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { CoursesService } from '../../services/courses.service';
import { Author } from '../../models/author.model';
import { DEBOUNCE_TIME } from 'src/app/constants/api';

@Component({
  selector: 'app-authors-input',
  templateUrl: './authors-input.component.html',
  styleUrls: ['./authors-input.component.scss']
})
export class AuthorsInputComponent implements OnInit, OnDestroy {

  autoCompleteAuthors: Author[] = [];

  private searchChange$: Subject<string> = new Subject();

  constructor(
    private coursesService: CoursesService,
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.searchChange$
      .pipe(
        debounceTime(DEBOUNCE_TIME),
        switchMap(str => this.coursesService.getAuthors(str)),
      )
      .subscribe((authors: Author[]) => {
        this.autoCompleteAuthors = authors;
        this.cd.markForCheck();
      });

    this.onSearch('');
  }

  onSearch(searchValue: string): void {
    this.searchChange$.next(searchValue);
  }

  ngOnDestroy() {
    this.searchChange$.complete();
  }
}
