import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TimeSheetErrorResponse } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor(
    private snackBar: MatSnackBar,
  ) {

  }

  public showInfo(info: string) {
    this.snackBar.open(info, "OK", {
      duration: 3000, verticalPosition: 'top', panelClass: "info-snack"
    });
  }

  public showError(error: Partial<TimeSheetErrorResponse>) {
    this.snackBar.open(JSON.stringify(error.message, null, 2), "OK", {
      duration: -1, verticalPosition: 'top', panelClass: "error-snack"
    });
  }

  public showErrorString(erroreMessage: string) {
    this.snackBar.open(erroreMessage, "OK", {
      duration: -1, verticalPosition: 'top', panelClass: "error-snack"
    });
  }
}
