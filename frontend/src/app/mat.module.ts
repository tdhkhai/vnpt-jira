import { NgModule } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  imports: [
    MatDialogModule,
    MatButtonModule,

  ],
  exports: [
    MatDialogModule,
    MatButtonModule,

  ]
})
export class MatModule { }
