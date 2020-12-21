import { NgModule } from '@angular/core';
import {TableModule} from 'primeng/table';
import {PaginatorModule} from 'primeng/paginator';
import {ButtonModule} from 'primeng/button';

@NgModule({
  imports: [
    TableModule,
    PaginatorModule,
    ButtonModule,
  ],
  exports: [
    TableModule,
    ButtonModule,
    PaginatorModule,
  ]
})
export class PrimengModule { }
