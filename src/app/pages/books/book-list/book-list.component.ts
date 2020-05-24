import { Component, OnInit } from '@angular/core';
import { AbstractListComponent } from 'src/app/shared/abstract-list';
import { Book } from '../book-model/book';
import { BookService } from '../book-service/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionData } from 'src/app/security/model/session-data';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent extends AbstractListComponent<Book, BookService> implements OnInit {

  constructor(service: BookService, activatedRoute: ActivatedRoute, router: Router) {
    super(service, router, Book, activatedRoute);
  }

  userData: SessionData = new SessionData();

  ngOnInit() {
    super.ngOnInit();
    this.userData = JSON.parse(sessionStorage.getItem('session-data'));
    console.log('==== Dados de Seção ====');
    console.log(this.userData);
  }

}
