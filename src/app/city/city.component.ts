import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { SandboxService } from '../sandbox.service';


@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {
  // MatTableDataSource Inputs
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['id', 'name'];
  selection = new SelectionModel<any>(false, []);
  // MatProgressSpinner Input
  loading = true;
  // MatPaginator Inputs
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public rest: SandboxService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.getCities(this.paginator.pageIndex, this.pageSize);
  }

  /**
   * Filter the elements of the table according one word (expression).
   * 
   * @param filterValue string to search over the datasource visible at the MatTableDataSource
   */
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Call the WS to refresh the data at the table.
   */
  refreshData() {
    this.getCities(this.paginator.pageIndex, this.paginator.pageSize);
  }


  /**
   * Call the WS to retrieve the list of City according the pagination parameters.
   * 
   * @param page the page number location
   * @param size the City elements visible by page
   */
  getCities(page: number, size: number) {
    this.rest.getCities(page, size).subscribe((data: any) => {
      console.log(data);
      this.dataSource.data = data.results;
      this.paginator.length = data.totalElements;
      this.loading = false;
    });
  }
}
