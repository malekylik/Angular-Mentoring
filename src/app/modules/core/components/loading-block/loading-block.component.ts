import { Component, OnInit } from '@angular/core';

import { LoadingBlockService } from '../../services/loading-block/loading-block.service';

@Component({
  selector: 'app-loading-block',
  templateUrl: './loading-block.component.html',
  styleUrls: ['./loading-block.component.scss']
})
export class LoadingBlockComponent implements OnInit {

  isLoading: boolean = false;

  constructor(private loadingBlockService: LoadingBlockService) { }

  ngOnInit() {
    this.loadingBlockService.getLoadingBlockStatus()
    .subscribe((isLoading) => this.isLoading = isLoading);
  }
}
