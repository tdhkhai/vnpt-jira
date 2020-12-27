import { Component, OnInit } from '@angular/core';
import { DausoService } from 'src/app/core/services/dauso.service';
import { DomainService } from 'src/app/core/services/domain.service';
import { IDCService } from 'src/app/core/services/idc.service';
import { WebhostingService } from 'src/app/core/services/webhosting.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  providers: [MessageService]
})
export class WelcomeComponent implements OnInit {
  gridStyle = {
    width: '25%',
    textAlign: 'center'
  };
  countDauso: any;
  allCusActivedDauso = 0;
  allCusCanceledDauso = 0;

  countDomain: any;
  allCusActivedDomain = 0;
  allCusCanceledDomain = 0;

  countIDC: any;
  allCusActivedIDC = 0;
  allCusCanceledIDC = 0;

  countWebhosting: any;
  allCusActivedWebhosting = 0;
  allCusCanceledWebhosting = 0;

  data: any;
  constructor(
    private dausoAPI: DausoService,
    private idcAPI: IDCService,
    private domainAPI: DomainService,
    private webhostingAPI: WebhostingService,
    private messageService: MessageService
  ) {
    this.data = {
      labels: ['Tháng 01', 'Tháng 02', 'Tháng 03', 'Tháng 04', 'Tháng 05', 'Tháng 06', 'Tháng 07', 'Tháng 08', 'Tháng 09', 'Tháng 10', 'Tháng 11', 'Tháng 12',],
      datasets: [
        {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: '#4bc0c0'
        },
        {
          label: 'Second Dataset',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderColor: '#565656'
        }
      ]
    }
    this.getCountDauso();
    this.getCountDomain();
    this.getCountIDC();
    this.getCountWebhosting();
  }

  ngOnInit() {
  }

  getCountDauso() {
    this.dausoAPI.GetCountDauso().subscribe((res) => {
      this.countDauso = res.msg;
      this.countDauso.forEach(element => {
        this.allCusActivedDauso += element.countActived;
        this.allCusCanceledDauso += element.countCanceled;
      });
    });
  }

  getCountDomain() {
    this.domainAPI.GetCountDomain().subscribe((res) => {
      this.countDomain = res.msg;
      this.countDomain.forEach(element => {
        this.allCusActivedDomain += element.countActived;
        this.allCusCanceledDomain += element.countCanceled;
      });
    });
  }

  getCountIDC() {
    this.idcAPI.GetCountIDC().subscribe((res) => {
      this.countIDC = res.msg;
      this.countIDC.forEach(element => {
        this.allCusActivedIDC += element.countActived;
        this.allCusCanceledIDC += element.countCanceled;
      });
    });
  }

  getCountWebhosting() {
    this.webhostingAPI.GetCountWebhosting().subscribe((res) => {
      this.countWebhosting = res.msg;
      this.countWebhosting.forEach(element => {
        this.allCusActivedWebhosting += element.countActived;
        this.allCusCanceledWebhosting += element.countCanceled;
      });
    });
  }

}
