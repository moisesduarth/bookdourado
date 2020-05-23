import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { Boots } from 'src/app/material.module';
import { DialogComponent } from './dialog/dialog.component';
// import { TranslateModule } from '@ngx-translate/core';
import { SpinnerComponent } from './spinner/spinner.component';
// import { DropTargetOptions, NgxUploadModule } from '@wkoza/ngx-upload';


@NgModule({
  declarations: [DialogComponent, SpinnerComponent],
  imports: [
    CommonModule,
    // MaterialModule,
    // NgxUploadModule,
  ],

  exports: [
    // MaterialModule,
    // TranslateModule
  ],

  entryComponents: [DialogComponent, SpinnerComponent]
})
export class AbstractModule { }
