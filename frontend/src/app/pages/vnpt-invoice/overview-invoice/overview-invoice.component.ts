import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { InvoiceService } from 'src/app/core/services/invoice.service';

@Component({
  selector: 'app-overview-invoice',
  templateUrl: './overview-invoice.component.html',
  styleUrls: ['./overview-invoice.component.scss'],
  providers: [MessageService]
})
export class OverviewInvoiceComponent implements OnInit {
  listOfData: any[] = [];
  listOfAllData: any[] = [];
  first = 0;
  rows = 10;
  data: any;
  constructor(
    private invoiceAPI: InvoiceService,
    private messageService: MessageService
  ) {
    this.data = {
      labels: ['Tháng 01', 'Tháng 02', 'Tháng 03', 'Tháng 04', 'Tháng 05', 'Tháng 06', 'Tháng 07', 'Tháng 08', 'Tháng 09', 'Tháng 10', 'Tháng 11', 'Tháng 12',],
      datasets: [
        {
          label: 'Demo',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: '#039eff'
        },
        {
          label: 'Chính thức',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderColor: '#32a11a'
        },
        {
          label: 'Bổ sung',
          data: [56, 75, 22, 44, 77, 88, 53],
          fill: false,
          borderColor: '#ff9203'
        }
      ]
    };
    this.getAllInvoices();
  }

  ngOnInit(): void {
  }



  selectData(event) {
    this.messageService.add({ severity: 'info', summary: 'Data Selected', 'detail': this.data.datasets[event.element._datasetIndex].data[event.element._index] });
  }

  getAllInvoices() {
    this.invoiceAPI.GetInvoices().subscribe(
      (data) => {
        this.listOfAllData = data;
        this.listOfData = data;
      }
    );
  }

}
