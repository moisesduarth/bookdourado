import { Component, OnInit } from '@angular/core';
import { AbstractFormComponent } from 'src/app/shared/abstract-form';
import { Book } from '../book-model/book';
import { BookService } from '../book-service/book.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/shared/toast/toast-service/toast.service';
import { ToastsContainer } from 'src/app/shared/toast/toasts-container/toasts-container.component';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent extends AbstractFormComponent<Book, BookService> implements OnInit {

  constructor(
    service: BookService,
    router: Router,
    activatedRoute: ActivatedRoute,
    dialog: NgbModal,
    snack: ToastService
    ) {
    super(service, Book, router, activatedRoute, dialog, snack);
  }

  ngOnInit(): void {
  }

}
