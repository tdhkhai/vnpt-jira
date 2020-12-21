import { Component, OnInit } from '@angular/core';
import { InvoiceService } from 'src/app/core/services/invoice.service';

@Component({
  selector: 'app-overview-invoice',
  templateUrl: './overview-invoice.component.html',
  styleUrls: ['./overview-invoice.component.scss']
})
export class OverviewInvoiceComponent implements OnInit {
  listOfData: any[] = [];
  listOfAllData: any[] = [];
  first = 0;
  rows = 10;
  constructor(
    private invoiceAPI: InvoiceService
  ) { this.getAllInvoices(); }

  ngOnInit(): void {
  }

  getAllInvoices() {
    this.invoiceAPI.GetInvoices().subscribe(
      (data) => {
        this.listOfAllData = data;
        this.listOfData = data;
      }
    );
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.listOfData ? this.first === (this.listOfData.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.listOfData ? this.first === 0 : true;
  }

}
