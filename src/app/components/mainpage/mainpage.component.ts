import { Component, OnInit, Output } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Status, TimesheetData, User } from 'src/app/interfaces/interfaces';
import { StatusService } from 'src/app/services/status-service.service';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {
  allUsers: User[] = [];
  allStatus: Status[] = [];

  @Output() showData: TimesheetData[] = [];
  @Output() isReload: boolean = false;
  constructor(
    private userService: UserService,
    private statusService: StatusService,
  ){

  }

  async ngOnInit(): Promise<void> {
    this.allUsers = await firstValueFrom(this.userService.getAllUsers());
    this.allStatus = await firstValueFrom(this.statusService.getALLStatuses());
  }

  receiveDataFromChild(event: any) {
    this.showData = event;
  }

  reloadPage(event: any) {
    this.triggerReload()
  }

  triggerReload() {
    this.isReload = true;
  }
}
