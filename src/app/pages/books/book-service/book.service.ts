import { Injectable } from '@angular/core';
import { Book } from '../book-model/book';
import { AbstractCrudService } from 'src/app/shared/abstract-crud.service';
import { CONSTANT_URL } from 'src/app/constants/constant-rest';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService extends AbstractCrudService<Book>  {

  constructor(http: HttpClient) {
    super(http, CONSTANT_URL.BOOK);
  }
}
