import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainpageComponent } from './components/mainpage/mainpage.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { TableComponentComponent } from './components/table-component/table-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material.module';
import { PrimengModule } from './modules/primeng.module';
import { FormsModule } from '@angular/forms';
import { CreateNewTaskDialogComponent } from './components/create-new-task-dialog/create-new-task-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmDeleteDialogComponent } from './components/confirm-delete-dialog/confirm-delete-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    MainpageComponent,
    SearchInputComponent,
    TableComponentComponent,
    CreateNewTaskDialogComponent,
    ConfirmDeleteDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    PrimengModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
