import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoService } from './info-service.service';
import { Router } from '@angular/router';
import { TimeSheetErrorResponse } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  protected base: string;

  constructor(protected http: HttpClient, protected infoService: InfoService, protected router: Router) { 
    this.base = 'http://localhost:8081/api/v1'
  }

  protected onError(httpErr: HttpErrorResponse) {
    let response: TimeSheetErrorResponse = httpErr.error;
    if (response.statusCode === 401) {
      this.router.navigateByUrl('');
    } else {
      if (response.statusCode && response.message) {
        this.infoService.showError(response);
      } else {
        const err: Partial<TimeSheetErrorResponse> = { message: [httpErr.message], statusCode: 500 }
        this.infoService.showError(err);
      }
    }
    return false;
  }
}
