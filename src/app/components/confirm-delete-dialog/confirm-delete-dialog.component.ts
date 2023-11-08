import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete-dialog',
  templateUrl: './confirm-delete-dialog.component.html',
  styleUrls: ['./confirm-delete-dialog.component.css']
})
export class ConfirmDeleteDialogComponent {
  data: {id?: number | null} = {id: null};
  constructor(
    @Inject(MAT_DIALOG_DATA) data: Partial<{id?: number | null}>,
  ){
    this.data = data;
  }

}
