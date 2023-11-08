import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Status } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class StatusService extends ApiService {
  getALLStatuses(): Observable<Status[]> {
    const uri = `${this.base}/status`;
    
    return this.http.get<Status[]>(uri);
  }
  
  getStatusById(statusId: string): Observable<Status> {
    const uri = `${this.base}/status/${statusId}`;

    return this.http.get<Status>(uri);
  }
}
