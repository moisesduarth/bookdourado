import { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// import { MatSnackBar, MatDialog } from '@angular/material';
// TODO: Fazer funcionar o Toaster também
// TODO: Fazer funcionar o Spinner https://www.npmjs.com/package/ng-bootstrap-spinner
import { NgbActiveModal, NgbModal  } from '@ng-bootstrap/ng-bootstrap';


import { AbstractCrudService } from './abstract-crud.service';
import { TOAST, DIALOG } from 'src/app/constants/constant-messages';
import { DialogComponent } from './dialog/dialog.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { HttpErrorResponse } from '@angular/common/http';
import { count } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { ToastService } from './toast/toast-service/toast.service';

export abstract class AbstractFormComponent<TModel extends any, TService extends AbstractCrudService<TModel>> implements OnInit {

    public obj: TModel;
    public edit: boolean;
    public view: boolean;
    public loading: any;

    public durationInSeconds = 5;

    constructor(
        public service: TService,
        public modelType: new () => TModel,
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public dialog?: NgbModal,
        public toastService?: ToastService
    ) { }

    ngOnInit() {
        this.view = this.router.url.includes('view');
        this.obj = this.getNew();
        this.getOne();
    }

    getNew(): TModel {
        return new this.modelType();
    }

    async getOne() {
        if (this.activatedRoute.snapshot.paramMap.get('id') !== null) {
            this.loading = this.spinner();
            const id = this.activatedRoute.snapshot.paramMap.get('id');
            await this.service.getOne(id).subscribe(
                success => {
                    setTimeout(() => {
                        this.loading.close();
                    }, 500);
                    this.obj = success.data;
                    console.log(this.obj);
                    this.edit = true;
                    //this.afterLoadOne();
                }, error => {
                    console.log('============= ERRO ===========');
                    console.log(error);
                    if (typeof error.error.errors !== 'undefined' && error.error.errors.length > 0) {
                        error.error.errors.forEach(e => {
                            this.toast(e, TOAST.ERROR.action, TOAST.ERROR.type);
                        });
                    } else {
                        this.toast(TOAST.SUPPORT.message, TOAST.ERROR.action, TOAST.ERROR.type);
                    }
                }
            );
        }
    }
    validate(field: FormControl): boolean {
        if (field.value) {
            if ((typeof field.value === 'string')) {
                field.setValue(field.value.trim());
                field.setErrors({ invalid: !field.value.trim().length });
                if (field.value.trim().length) {
                    field.updateValueAndValidity();
                }
            }
        }
        return field.errors !== null ? field.errors.invalid : false;
    }
    fieldNumberValidation(data: FormControl) {
        if (data.value < 2147483646) {
            if (data.value === null) {
                data.setErrors({ invalid: true });
            }
            if (data.value < 0 || (data.value + '').length >= 21) {
                data.setErrors({ invalid: true });
            }
        } else {
            data.setErrors({invalid: true});
        }
    }
    afterLoadOne() {
    }
    compareData(d1: TModel, d2: TModel) {
        if (d1 !== undefined && d2 !== undefined) {
            return d1 === d2;
        }
    }
    saveOrUpdate() {
        if (this.edit) {

          this.service.update(this.obj).subscribe(
            success => {
                this.back();
                this.toast(TOAST.SUCCESS.UPDATE.message, TOAST.SUCCESS.SAVE.action, TOAST.SUCCESS.SAVE.type);
            }, error => {
                console.log('============= ERRO ===========');
                console.log(error);
                if (typeof error.error.errors !== 'undefined' && error.error.errors.length > 0) {
                    console.log(error.error.errors);
                    error.error.errors.forEach(e => {
                        this.toast(e, TOAST.ERROR.action, TOAST.ERROR.type);
                    });
                } else {
                    this.toast(TOAST.SUPPORT.message, TOAST.ERROR.action, TOAST.ERROR.type);
                }
              }
            );
            // const dialogRef = this.dialog.open(DialogComponent, {
            //     centered: true,
            //     size: 'lg',
            // });

            // dialogRef.afterClosed().subscribe(result => {
            //     if (result) {
            //         this.service.update(this.obj).subscribe(
            //             success => {
            //                 this.back();
            //                 this.toast(TOAST.SUCCESS.UPDATE.message, TOAST.SUCCESS.SAVE.action, TOAST.SUCCESS.SAVE.type);
            //             }, error => {
            //                 console.log('============= ERRO ===========');
            //                 console.log(error);
            //                 if (typeof error.error.errors !== 'undefined' && error.error.errors.length > 0) {
            //                     console.log(error.error.errors);
            //                     error.error.errors.forEach(e => {
            //                         this.toast(e, TOAST.ERROR.action, TOAST.ERROR.type);
            //                     });
            //                 } else {
            //                     this.toast(TOAST.SUPPORT.message, TOAST.ERROR.action, TOAST.ERROR.type);
            //                 }
            //             }
            //         );
            //     }
            // });

        } else {
            this.service.save(this.obj).subscribe(
                success => {
                    this.back();
                    this.toast(TOAST.SUCCESS.SAVE.message, TOAST.SUCCESS.UPDATE.action, TOAST.SUCCESS.UPDATE.type);
                }, error => {
                    console.log('============= ERRO ===========');
                    console.log(error);
                    if (typeof error.error.errors !== 'undefined' && error.error.errors.length > 0) {
                        error.error.errors.forEach(e => {
                            this.toast(e, TOAST.ERROR.action, TOAST.ERROR.type);
                        });
                    } else {
                        this.toast(TOAST.SUPPORT.message, TOAST.ERROR.action, TOAST.ERROR.type);
                    }
                }
            );
        }
    }

    getLocation() {
        const tree = this.router.parseUrl(this.router.url);
        return tree.root.children.primary.segments.map(it => it.path).join('/');
    }

    getParentPath(path?: any) {
        if (path) {
            return path.slice(0, Math.max(path.lastIndexOf('/'), 0));
        }
        return this.getLocation().slice(0, Math.max(this.getLocation().lastIndexOf('/'), 1)
        );
    }

    back() {
        if (this.edit) {
            this.router.navigate([this.getParentPath(this.getParentPath())]);
        } else {
            this.router.navigate([this.getParentPath()]);
        }
    }

    // toast(message: string, action: string, type: string) {

    //     // TODO: Fazer a adaptação para o Toast do Bootstrap
    //     return alert('Mensagem: ' + message + ' - Tipo: ' + type + ' - Ação: ' + action);

    //     // this.snack.open(message, action, {
    //     //     duration: this.durationInSeconds * 1000,
    //     //     verticalPosition: 'top',
    //     //     horizontalPosition: 'right',
    //     //     panelClass: type,
    //     // });
    // }

    toast(message: string, action: string, type: string) {
      this.toastService.show('I am a success toast', { classname: 'bg-success text-light', delay: 10000 });
    }

    showStandard() {
      this.toastService.show('I am a standard toast');
    }

    showSuccess() {
      this.toastService.show('I am a success toast', { classname: 'bg-success text-light', delay: 10000 });
    }

    showDanger(dangerTpl) {
      this.toastService.show(dangerTpl, { classname: 'bg-danger text-light', delay: 15000 });
    }

    spinner() {
        // TODO: Fazer adaptação do spinner para bootstrap
        return console.log('Carregando... Spinner...');

        /*
        return this.dialog.open(SpinnerComponent, {
            width: '100%',
            height: '100%',
            disableClose: true,
            hasBackdrop: true,
            panelClass: 'panel',
        });
        */
    }

    /**
     * @description Remove os espaços antes e após o texto do input (Exemplo: <input maxlength="250" type="text" (blur)="trim($target)" />)
     * @param event Trata-se de um objeto do tipo FocusEvent disparado pela view
     */
    trim(event) {
        console.log(event);
        event.target.value = event.target.value.trim();
    }
}
