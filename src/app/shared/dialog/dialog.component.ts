import { Component, OnInit, Input, Inject, Type } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

export class NgbdModalConfirm {
  constructor(public modal: NgbActiveModal) {}
}

export class NgbdModalConfirmAutofocus {
  constructor(public modal: NgbActiveModal) {}
}

const MODALS: {[name: string]: Type<any>} = {
  focusFirst: NgbdModalConfirm,
  autofocus: NgbdModalConfirmAutofocus
};

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  constructor(private _modalService: NgbModal) {}

  open(name: string) {
    this._modalService.open(MODALS[name]);
  }

}
