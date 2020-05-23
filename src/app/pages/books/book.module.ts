import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookFormComponent } from './book-form/book-form.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookRoutingModule } from './book-routing.module';
import { AbstractModule } from 'src/app/shared/abstract.module';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [BookFormComponent, BookListComponent],
  imports: [
    CommonModule,
    BookRoutingModule,
    AbstractModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class BookModule { }
