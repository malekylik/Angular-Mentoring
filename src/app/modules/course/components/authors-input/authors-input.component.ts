import { Component, OnInit, ChangeDetectorRef, OnDestroy, ViewChild, ElementRef, Optional, Self, Input } from '@angular/core';
import { switchMap, debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatAutocompleteSelectedEvent, MatChipList, MatAutocomplete } from '@angular/material';
import { NgControl, ControlValueAccessor } from '@angular/forms';

import { CoursesService } from '../../services/courses.service';
import { Author } from '../../models/author.model';
import { DEBOUNCE_TIME } from 'src/app/constants/api';
import { ValidationService } from 'src/app/modules/core/services/validation/validation.service';

const noop = () => { };

@Component({
  selector: 'app-authors-input',
  templateUrl: './authors-input.component.html',
  styleUrls: ['./authors-input.component.scss']
})
export class AuthorsInputComponent implements OnInit, OnDestroy, ControlValueAccessor {

  authors: Author[] = [];
  autocompleteAuthors: Author[] = [];
  removable: boolean = true;

  @Input() name: string = '';
  @Input('required') isRequired = false;
  @Input() placeholder: string = '';
  @ViewChild('authorInput') input: ElementRef<HTMLInputElement>;
  @ViewChild('chipList') chipList: MatChipList;
  @ViewChild('auto') auto: MatAutocomplete;

  private searchChange$: Subject<string> = new Subject();
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private coursesService: CoursesService,
    private cd: ChangeDetectorRef,
    public validationService: ValidationService,
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

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

    this.auto.closed.subscribe(() => this.onTouchedCallback());

    this.onSearch('');
  }

  ngAfterViewInit() {
    this.chipList.ngControl = this.ngControl;
  }

  onBlur() {
    if (!this.auto.isOpen) {
      this.onTouchedCallback();
    }
  }

  writeValue(authors: Author[]) {
    if (authors !== this.authors) {
      this.authors = authors;
    }
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  onSearch(searchValue: string): void {
    this.searchChange$.next(searchValue);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.authors.push(event.option.value);
    this.input.nativeElement.value = '';
    this.autocompleteAuthors = [];
    this.onSearch('');
    this.onChangeCallback(this.authors);
  }

  remove(author: Author): void {
    this.authors = this.authors.filter(_author => author !== _author);
    this.onSearch('');
    this.onChangeCallback(this.authors);
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
