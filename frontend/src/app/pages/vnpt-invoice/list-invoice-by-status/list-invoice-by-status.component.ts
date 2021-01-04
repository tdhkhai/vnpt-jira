import { Component, OnInit } from '@angular/core';
import { ExcelToFileService } from 'src/app/core/services/exceltofile.service';
import { InvoiceService } from 'src/app/core/services/invoice.service';

@Component({
  selector: 'app-list-invoice-by-status',
  templateUrl: './list-invoice-by-status.component.html',
  styleUrls: ['./list-invoice-by-status.component.scss']
})
export class ListInvoiceByStatusComponent implements OnInit {
  yearSelected: string;
  statusSelected: string;
  listOfData: any = [];
  loading = false;
  constructor(
    private excelToFile: ExcelToFileService,
    private invoiceAPI: InvoiceService,
  ) {
    const payload = {
      yearSelected: this.yearSelected,
      statusSelected: this.statusSelected
    };
    invoiceAPI.GetListInvoicebyStatus(payload).subscribe((data) => {
      this.listOfData = data;
      console.log(this.listOfData);

    });
  }

  ngOnInit(): void {
  }

  exportExcel() {
    this.excelToFile.exportExcel(this.listOfData, 'danh-sach-hddt-theo-trang-thai');
  }
}
