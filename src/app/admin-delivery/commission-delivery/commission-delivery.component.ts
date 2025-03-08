import { Component, OnInit } from '@angular/core';
import { CommissionDelivery } from 'src/app/model/commission-delivery';
import { CommissionService } from 'src/app/service/commission.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-commission-delivery',
  templateUrl: './commission-delivery.component.html',
  styleUrls: ['./commission-delivery.component.css']
})
export class CommissionDeliveryComponent implements OnInit{
  commissions: CommissionDelivery[]=[];

  constructor(private commissionService:CommissionService,private notifier:NotificationService){}
  
    ngOnInit(): void {
        this.getCommissions();
    }

    getCommissions() {
      this.commissionService.getCommissionByDelivery$().subscribe(
        (res) => {
          this.commissions = res.data.commissionDeliveries;
          this.notifier.onDefault(res.message);
        },
        (error) => {
          this.notifier.onError('Error');
        }
      );
    }

}
