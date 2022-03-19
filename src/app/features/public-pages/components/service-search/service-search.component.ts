import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APP_ROUTES } from '@app/core/core.constant';

@Component({
  selector: 'app-service-search',
  templateUrl: './service-search.component.html',
  styleUrls: ['./service-search.component.scss']
})
export class ServiceSearchComponent implements OnInit {

  searchText!: string;

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  onSearchSubmit() {
    const solutionsBrowseQueryParams = {
      search: this.searchText,
      someFields: 'test'
    };
    this.router.navigate([APP_ROUTES.SOLUTIONS], { queryParams: solutionsBrowseQueryParams, queryParamsHandling: 'merge' });
  }

}
