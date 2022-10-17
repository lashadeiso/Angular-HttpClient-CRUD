import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TemplateDrivenComponent } from './template-driven/template-driven.component';
import { StudentsListRenderComponent } from './students-list-render/students-list-render.component';
import { UpdateModalComponent } from './update-modal/update-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    TemplateDrivenComponent,
    StudentsListRenderComponent,
    UpdateModalComponent,
  ],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
