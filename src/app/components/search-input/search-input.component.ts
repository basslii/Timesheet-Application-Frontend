import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { CreateNewTaskDialogComponent } from '../create-new-task-dialog/create-new-task-dialog.component';
import { NewTaskData, Status, TimesheetData, User } from 'src/app/interfaces/interfaces';
import { InfoService } from 'src/app/services/info-service.service';
import { TimesheetService } from 'src/app/services/timesheet.service';
import * as moment from 'moment';
import { UserService } from 'src/app/services/user-service.service';
import { StatusService } from 'src/app/services/status-service.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent implements OnInit, OnChanges {
  @Input() allStatus: Status[] = [];
  @Input() allUsers: User[] = [];
  @Input() isReload: boolean = false;
  @Output() customEvent = new EventEmitter<TimesheetData[]>();
  searchModel: string = '';

  constructor(
    private dialog: MatDialog,
    private infoService: InfoService,
    private timeSheetService: TimesheetService,
    private userService: UserService,
    private statusService: StatusService,
  ){}

  ngOnInit(): void {
    this.loadPage();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isReload'] && changes['isReload'].currentValue === true) {
      this.loadPage();
    }
  }

  async loadPage(data?: TimesheetData[]): Promise<void> {
    if(data?.length) {
      this.customEvent.emit([...data]);
    } else {
      this.timeSheetService.getDataBySearchTask('').subscribe(allData => {
        this.customEvent.emit(allData);
      })
    }

  }
  
  async onSearchModel(): Promise<void> {
    this.timeSheetService.getDataBySearchTask(this.searchModel).subscribe(async foundResult => {
      if (foundResult.length) {
        await this.loadPage(foundResult!);
        this.infoService.showInfo('Successfully found result');
      } else {
        this.infoService.showErrorString(`Failed to find with keyword ${this.searchModel}`);
      }
    })

  }

  async onCreateNewModel(): Promise<void> {
    const data: Partial<NewTaskData> = {
      title: 'Timesheet Entry',
      fields: { Project: '', Task: this.searchModel, startDate: '', endDate: '', Status: '', AssignTo: '' },
      multiple: [false, false, false, false, true, true],
      date: [false, false, true, true, false, false],
      users: this.allUsers,
      status: this.allStatus,
      edit: false,
    }

    const dialogResponse = await firstValueFrom(this.dialog.open(CreateNewTaskDialogComponent, { disableClose: true, height: '90%', width: '50%', data}).afterClosed());

    if (dialogResponse) {

      const timesheetData: Partial<TimesheetData> = {
        project: dialogResponse.fields.Project,
        task: dialogResponse.fields.Task,
        assignedTo: await firstValueFrom(this.userService.getUserById(this.allUsers.find(user => user.name === dialogResponse.fields!.AssignTo!)!.id!.toString())),
        startDate: moment(dialogResponse.fields.startDate).format('DD-MM-YYYY'),
        endDate: moment(dialogResponse.fields.endDate).format('DD-MM-YYYY'),
        status: await firstValueFrom(this.statusService.getStatusById(this.allStatus.find(status => status.status === dialogResponse.fields!.Status!)!.id!.toString())),
      }

      this.timeSheetService.createNewTask(timesheetData).subscribe(async createdTask => {
        if (createdTask) {
          await this.loadPage();
          this.infoService.showInfo('Successfully added new data');
        } else {
          this.infoService.showErrorString('Failed to add new data');
        }
        this.searchModel = ''
      });
    }
  }

  onChangeKeyword(keyword: string) {
    if(keyword === '') {
      this.loadPage();
    }
  }

}
