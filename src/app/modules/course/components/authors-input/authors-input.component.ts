import { Component, OnInit, ChangeDetectorRef, OnDestroy, Input, ViewChild, ElementRef } from '@angular/core';
import { switchMap, debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material';

import { CoursesService } from '../../services/courses.service';
import { Author } from '../../models/author.model';
import { DEBOUNCE_TIME } from 'src/app/constants/api';

@Component({
  selector: 'app-authors-input',
  templateUrl: './authors-input.component.html',
  styleUrls: ['./authors-input.component.scss']
})
export class AuthorsInputComponent implements OnInit, OnDestroy {

  @Input() authors: Author[] = [];
  @ViewChild('authorInput') input: ElementRef<HTMLInputElement>;
  autocompleteAuthors: Author[] = [];
  removable: boolean = true;

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
        this.autocompleteAuthors = this.filterAutocomplete(this.authors, authors);
        this.cd.markForCheck();
      });

    this.onSearch('');
  }

  onSearch(searchValue: string): void {
    this.searchChange$.next(searchValue);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.authors.push(event.option.value);
    this.input.nativeElement.value = '';
    this.autocompleteAuthors = [];
    this.onSearch('');
  }

  remove(author: Author): void {
    this.authors = this.authors.filter(_author => author !== _author);
    this.onSearch('');
  }

  ngOnDestroy() {
    this.searchChange$.complete();
  }

  private filterAutocomplete(authors: Author[], autocompleteAuthors: Author[]): Author[] {
    const filterCount: number = autocompleteAuthors.length - authors.length;
    const filteredAutocomplete: Author[] = [];

    for (let i = 0; i < autocompleteAuthors.length && filteredAutocomplete.length !== filterCount; i++) {
        if (authors.findIndex(a => a.name === autocompleteAuthors[i].name) === -1) {
          filteredAutocomplete.push(autocompleteAuthors[i]);
        }
    }

    return filteredAutocomplete;
  }
}
