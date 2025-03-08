import { AfterViewInit, Component, OnInit,ViewChild } from '@angular/core';
import { CommissionService } from '../../service/commission.service';
import { NotificationService } from 'src/app/service/notification.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { Commission } from 'src/app/model/commission';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-commission-system',
  templateUrl: './commission-system.component.html',
  styleUrls: ['./commission-system.component.css']
})
export class CommissionSystemComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['amount', 'created_at'];
  dataSource = new MatTableDataSource<Commission>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private commissionService:CommissionService,private notifier:NotificationService){}

  ngOnInit(): void {
      this.getCommissions();
  }

  

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getCommissions() {
    this.commissionService.getCommissionByUser$().subscribe(
      (res) => {
        this.dataSource.data = res.data.commissions;
        console.log(res);
      },
      (error) => {
        this.notifier.onError('Error');
      }
    );
  }

}
