import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NewTaskData } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-create-new-task-dialog',
  templateUrl: './create-new-task-dialog.component.html',
  styleUrls: ['./create-new-task-dialog.component.css']
})
export class CreateNewTaskDialogComponent {
  isInputDisabled: boolean = true;
  inputFormGroup!: FormGroup;
  data!: Partial<NewTaskData>;
  fields: { key: string, value: string, multiple: boolean, date: boolean }[] = []

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: Partial<NewTaskData>,
    private dialogRef: MatDialogRef<Partial<NewTaskData>>,
  ){
    this.data = data;
    let index = 0;
    for (const key in this.data.fields) {
      if (this.data.fields.hasOwnProperty(key)) {
        const element = this.data.fields[key];

        this.fields.push({
          key, value: typeof element === 'string' ? element : '',
          multiple: this.data.multiple ? this.data.multiple[index] : false,
          date: this.data.date ? this.data.date[index] : false
        });
        index++;
      }
    }
    
    if (this.data.fields) {
      this.inputFormGroup = this.formBuilder.group(this.data.fields);
      this.inputFormGroup.valueChanges.subscribe((el) => {
        this.data!.fields = el;
      });
    }
  }

  onConfirmSave(): void {
    this.dialogRef.close(this.data!.fields);
  }

}
