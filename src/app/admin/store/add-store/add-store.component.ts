import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { StoreRequest } from 'src/app/model/request/storeRequest';
import { MessageModalService } from 'src/app/service/message-modal.service';
import { NotificationService } from 'src/app/service/notification.service';
import { StoreService } from 'src/app/service/storeService.service';

@Component({
  selector: 'app-add-store',
  templateUrl: './add-store.component.html',
  styleUrls: ['./add-store.component.css']
})
export class AddStoreComponent implements OnInit {
  loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading$ = this.loading.asObservable();
  private isUpdate: boolean = false;

  storeForm = this.fbuilder.group({
    name: ['', [Validators.required]],
    phoneNumber: ['', [Validators.min(9), Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    address: ['', [Validators.required, Validators.required]],
    userEmail: ['', [Validators.email, Validators.required]],
  });

  storeRequest: StoreRequest = { name: '', latitude: 0, longitude: 0, email: '', phoneNumber: '', userEmail: '', address: '' };

  constructor(private location: Location, private fbuilder: FormBuilder, private notifier: NotificationService, private alertService: MessageModalService,
    private storeService: StoreService, private router: Router
  ) { }

  ngOnInit(): void {
    this.getUserLocation();
  }

  onGoBack() {

    if (!this.isUpdate) {
      this.alertService.confirmMessage("Do you want to discase the change ?");
      this.alertService.checkDiscaseValueAfterCloseModale$().subscribe(
        {
          next: response => {
            if (response) {
              this.alertService.updateValue();
              this.location.back();
            } else {
            }
          }
        }
      )
    }

  }

  onSaveCreate() {
    this.storeRequest.email = this.storeForm.value.email;
    this.storeRequest.name = this.storeForm.value.name;
    this.storeRequest.phoneNumber = this.storeForm.value.phoneNumber;
    this.storeRequest.userEmail = this.storeForm.value.userEmail;
    this.storeRequest.address = this.storeForm.value.address;
    this.createStore(this.storeRequest);
  }


  private getUserLocation(): void {
    navigator.geolocation.getCurrentPosition(
      (position) => {

        this.storeRequest.latitude = position.coords.latitude;
        this.storeRequest.longitude = position.coords.longitude;
      },
      (error) => {
        console.error('Error getting user location:', error);
      }
    );
  }

  createStore(storeRequest: StoreRequest): void {
    this.loading.next(true);
    this.storeService.create$(storeRequest).subscribe(
      {
        next: (response) => {
          this.notifier.onSuccess(response.message);
          this.isUpdate = true;
          this.loading.next(false);
          this.storeForm.reset();
          this.router.navigate(["/service"])
        },
        error: (error: HttpErrorResponse) => {
          this.loading.next(false);
          if (error.error.validationError) {
            this.notifier.onWarning(error.error.validationError);
            this.loading.next(false);
          } else {
            // this.notifier.onWarning(error.error.validationError);
            if (error.error.errorCode === 50) {
              this.notifier.onError("Store field cannot be empty");
            }
            if (error.error.errorCode === 103) {
              this.notifier.onError("Phone number cannot be empty or null");
            }
            if (error.error.errorCode === 108) {
              this.notifier.onError("Phone number must have 9 number");
            }
            if (error.error.errorCode === 104) {
              this.notifier.onError("Email cannot be empty");
            }
            if (error.error.errorCode === 105) {
              this.notifier.onError("Invalid format email");
            }
            if (error.error.errorCode === 106) {
              this.notifier.onError("Address number cannot be empty");
            }
          }
          if (error.error) {
            this.notifier.onError("Use different location");
          }
          if (error.error) {
            this.notifier.onError("User not found")
          }
          this.isUpdate = false;
          this.loading.next(false);
        },
        complete: () => { this.loading.next(false); }
      });
  }


}
