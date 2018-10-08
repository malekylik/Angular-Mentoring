import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.css']
})
export class ToolboxComponent implements OnInit {

  searchValue: string = "";

  @Output()
  search: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onSearch() {
    this.search.emit(this.searchValue);
  }
}
