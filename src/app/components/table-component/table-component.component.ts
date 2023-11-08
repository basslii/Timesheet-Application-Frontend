import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CoreTableColoumn, CoreTableColoumnOption, NewTaskData, Status, TimesheetData, User } from 'src/app/interfaces/interfaces';
import { TimesheetService } from 'src/app/services/timesheet.service';
import { CreateNewTaskDialogComponent } from '../create-new-task-dialog/create-new-task-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import * as moment from 'moment';
import { UserService } from 'src/app/services/user-service.service';
import { StatusService } from 'src/app/services/status-service.service';
import { InfoService } from 'src/app/services/info-service.service';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-table-component',
  templateUrl: './table-component.component.html',
  styleUrls: ['./table-component.component.css']
})
export class TableComponentComponent implements OnInit, OnChanges {
  constructor(
    private dialog: MatDialog,
    private timeSheetService: TimesheetService,
    private userService: UserService,
    private statusService: StatusService,
    private infoService: InfoService,
  ){}

  @Input() showData: TimesheetData[] = [];
  @Input() allUsers: User[] = [];
  @Input() allStatus: Status[] = [];
  @Input() isReload!: boolean;
  @Output() customEvent = new EventEmitter<string>();
  isLoading: boolean = false;

  options: CoreTableColoumnOption[] = [
    {
      icon: 'delete', tooltip: ' Delete', action: (value: TimesheetData) => {
        this.deleteData(value);
      }
    },
    {
      icon: 'edit', tooltip: 'Update', action: (value: TimesheetData) => {
        this.updateData(value);
      }
    }
  ];

  cols: Partial<CoreTableColoumn>[] = [
    { header: 'Project', field: 'project', width: '300px' },
    { header: 'Task', field: 'task', width: '300px' },
    { header: 'Assigned To', field: 'assignee', width: '100px' },
    { header: 'From', field: 'startDate', width: '100px' },
    { header: 'To', field: 'endDate', width: '100px' },
    { header: 'Status', field: 'status', width: '50px' },
  ]

  async ngOnInit(): Promise<void> {
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (changes['isReload'] && changes['isReload'].currentValue === true) {
      await this.loadDataTable();
    }
  }

  async loadDataTable(): Promise<void> {
    this.showData = await firstValueFrom(this.timeSheetService.getDataBySearchTask(''));
  }

  async performAction(o: CoreTableColoumnOption, val: TimesheetData ) {
    o.action(val);
  }

  async deleteData(value: TimesheetData): Promise<void> {
    const dialogResponse = await firstValueFrom(this.dialog.open(ConfirmDeleteDialogComponent, { disableClose: true, data: {id: value.id} }).afterClosed())
    if(dialogResponse) {
      this.isLoading = true;
      this.timeSheetService.deleteData(value.id).subscribe(async () => {
        this.showData = await firstValueFrom(this.timeSheetService.getDataBySearchTask(''));
        this.isLoading  = false;
      });
    }
  }

  async updateData(value: TimesheetData): Promise<void> {
    const data: Partial<NewTaskData> = {
      title: 'Timesheet Entry',
      fields: { Project: value.project, Task: value.task, startDate: moment(value.startDate, "DD-MM-YYYY").format("YYYY-MM-DDTHH:mm:ss"), endDate: moment(value.endDate, "DD-MM-YYYY").format("YYYY-MM-DDTHH:mm:ss"), Status: value.status!.status, AssignTo: value.assignedTo!.name },
      multiple: [false, false, false, false, true, true],
      date: [false, false, true, true, false, false],
      users: this.allUsers,
      status: this.allStatus,
      edit: true,
    }

    const dialogResponse = await firstValueFrom(this.dialog.open(CreateNewTaskDialogComponent, { disableClose: true, height: '90%', width: '50%', data }).afterClosed());

    if (dialogResponse) {
      this.isLoading = true;
      const timesheetData: TimesheetData = {
        id: +value.id!,
        project: dialogResponse.fields.Project,
        task: dialogResponse.fields.Task,
        assignedTo: await firstValueFrom(this.userService.getUserById(this.allUsers.find(user => user.name === dialogResponse.fields!.AssignTo!)!.id!.toString())),
        startDate: moment(dialogResponse.fields.startDate).format('DD-MM-YYYY'),
        endDate: moment(dialogResponse.fields.endDate).format('DD-MM-YYYY'),
        status: await firstValueFrom(this.statusService.getStatusById(this.allStatus.find(status => status.status === dialogResponse.fields!.Status!)!.id!.toString())),
      }
      this.timeSheetService.createNewTask(timesheetData).subscribe(async updatedTask => {

        if (updatedTask) {
          this.customEvent.emit('reload')
          this.showData = await firstValueFrom(this.timeSheetService.getDataBySearchTask(''));
          this.isLoading = false;
          this.infoService.showInfo(`Successfully updated data with id ${value.id}`);
        }

      })

    }
  }
}
