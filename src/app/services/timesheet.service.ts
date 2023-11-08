import { Injectable } from '@angular/core';
import { TimeSheetReqBody, TimesheetData } from '../interfaces/interfaces';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService extends ApiService {

  getDataBySearchTask(keyword: string = ''):Observable<TimesheetData[]> {
    const uri = `${this.base}/tasks?keyword=${keyword}`;

    return this.http.get<TimesheetData[]>(uri).pipe(
      map((returnedData: TimesheetData[]) => {
        return returnedData.map((data: TimesheetData) => this.convertToNormalBody(data));
      })
    );
  }

  createNewTask(data: Partial<TimesheetData>): Observable<TimesheetData> {
    const uri = `${this.base}/tasks/add`;
    const reqBody = this.convertToReqBody(data);

    return this.http.post<TimesheetData>(uri, reqBody).pipe(
      map((returnedData: TimesheetData) => this.convertToNormalBody(returnedData))
    );
  }

  updateTask(data: TimesheetData, taskId: number): Observable<boolean> {
      const uri = `${this.base}/tasks/${taskId}`;
      return this.http.put<boolean>(uri, data);
  }

  deleteData(taskId: number): Observable<boolean> {
    const uri = `${this.base}/tasks/${taskId}`;
    return this.http.delete<boolean>(uri);
  }

  private convertToReqBody(data: Partial<TimesheetData>): Partial<TimesheetData> {
    const { startDate, endDate, ...otherElements} = data

    const convertedStartDate = moment(startDate, "DD-MM-YYYY").format("YYYY-MM-DDTHH:mm:ss")
    const convertedEndDate = moment(endDate, "DD-MM-YYYY").format("YYYY-MM-DDTHH:mm:ss")

    return { ...otherElements, startDate: convertedStartDate, endDate: convertedEndDate }
  }

  private convertToNormalBody(data: TimesheetData): TimesheetData {
    const { startDate, endDate, ...otherElements} = data

    const startDateString = startDate!.split('T')[0].split('-').reverse().join('-');
    const endDateString = endDate!.split('T')[0].split('-').reverse().join('-');

    return { ...otherElements, startDate: startDateString, endDate: endDateString }
  }
}
