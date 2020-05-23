import { OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { Router, ActivatedRoute } from '@angular/router';

import { AbstractCrudService } from './abstract-crud.service';
import { DIALOG, TOAST } from 'src/app/constants/constant-messages';


export abstract class AbstractListComponent<TModel extends any,
                      TService extends AbstractCrudService<TModel>>
                      implements OnInit, AfterViewInit {

    @ViewChild('table', { static: false }) table: any;

    public durationInSeconds = 5;
    public loading: boolean;
    public list: TModel[] = [];
    public disabled: boolean;
    public dataSource = new Array<TModel>();
    public displayedColumns: TModel[] = [];
    public selection = new SelectionModel<TModel>(true, []);

    constructor(
        public service: TService,
        public router: Router,
        public modelType: new () => TModel,
        public activatedRoute: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.disabled = localStorage.getItem('viewDisabled') == 'true';
        this.showDisable();
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.updateTable();
            // TODO: Arrumar paginação
        }, 0);
    }

    showDisabled() {
        this.disabled = !this.disabled;
        localStorage.setItem('viewDisabled', this.disabled + '');
        this.loading = true;
        this.list = new Array<TModel>();
        this.dataSource = this.list;
        this.showDisable();
    }
    showDisable() {
        if (this.disabled) {
            this.service.getAllFilterEntity('statusEntity%3AREMOVED').subscribe(success => {
                setTimeout(() => {
                    this.loading = false;
                }, 500);
                for (const dt of success) {
                    this.list.push(dt);
                }
                this.dataSource = this.list;
                this.updateTable();
            }, error => {
                console.log('error=>', error);
            });
        } else {
            this.getAll();
        }

    }
    enableEntity(id: string, param) {
        alert('TODO: Implementar essa função');
        // const dialogRef = this.dialog.open(DialogComponent, {
        //     width: '400px',
        //     data: { settings: DIALOG.CONFIRM.REACTIVATE }
        // });
        // dialogRef.afterClosed().subscribe(result => {
        //     if (result) {
        //         this.service.enableEntity(id, param).subscribe(success => {
        //             this.toast('Registro reativado com sucesso', TOAST.SUCCESS.SAVE.action, TOAST.SUCCESS.SAVE.type);
        //             localStorage.setItem('viewDisabled', 'false');
        //             this.disabled = !this.disabled;

        //             this.showDisable();
        //         }, error => {
        //             console.log('============= ERRO ===========');
        //             console.log(error);
        //             if (typeof error.error.errors !== 'undefined' && error.error.errors.length > 0) {
        //                 console.log(error.error.errors);
        //                 error.error.errors.forEach(e => {
        //                     this.toast(e, TOAST.ERROR.action, TOAST.ERROR.type);
        //                 });
        //             } else {
        //                 this.toast(TOAST.SUPPORT.message, TOAST.ERROR.action, TOAST.ERROR.type);
        //             }
        //         });
        //     }
        // });
    }
    getAll() {

        this.loading = true;
        this.service.getAll().subscribe(
            success => {
                setTimeout(() => {
                    console.log('teste');
                    this.loading = false;
                }, 500);
                this.list = success;
                this.dataSource = this.list;
                console.log(success);
                if (this.table) {
                  this.updateTable();
                }
            }, error => {
                console.log(error);
                this.toast(TOAST.ERROR.message, TOAST.ERROR.action, TOAST.ERROR.type);
            }
        );
    }

    updateTable() {
        // this.dataSource.sort = this.sort;
        // this.dataSource.paginator = this.paginator;
        // this.displayedColumns = this.table._contentColumnDefs._results.map((o: { _name: string; }) => o._name);
    }

    // Table settings
    applyFilter(filterValue: string) {
        // this.dataSource.filter = filterValue.trim().toLowerCase();

        // if (this.dataSource.paginator) {
        //     this.dataSource.paginator.firstPage();
        // }
    }

    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.length;
        return numSelected === numRows;
    }

    masterToggle() {
        this.isAllSelected() ? this.selection.clear() : this.dataSource.forEach(row => this.selection.select(row));
    }

    checkboxLabel(row?: TModel): string {
        if (!row) {
            return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
    }
    // Table settings

    getLocation() {
        const tree = this.router.parseUrl(this.router.url);
        return tree.root.children.primary.segments.map(it => it.path).join('/');
    }

    create() {
        this.router.navigate([this.getLocation() + '/form']);
    }
    detail(path: string, obj: TModel) {
        this.router.navigate([this.getLocation() + '/' + path, obj.pid.toString()]);
    }
    edit(obj: TModel) {
        this.router.navigate([this.getLocation() + '/form', obj.pid.toString()]);
    }
    view(obj: TModel) {
        this.router.navigate([this.getLocation() + '/view', obj.pid.toString()]);
    }
    doFilter(filter: string) {
        //this.dataSource.filter = filter.trim().toLowerCase();
    }
    delete(obj?: TModel) {
      this.service.delete(obj.pid).subscribe(
          success => {
              this.getAll();
              this.toast(TOAST.SUCCESS.DELETE.message, TOAST.SUCCESS.DELETE.action, TOAST.SUCCESS.DELETE.type);
          }, error => {
              this.toast(TOAST.ERROR.message, TOAST.ERROR.action, TOAST.ERROR.type);
          }
      );
    }

    toast(message: string, action: string, type: string) {
        alert(type + ' - Falta implementar TOAST - ' + message + ' - Ação: ' + action);
        // this.snack.open(message, action, {
        //     duration: this.durationInSeconds * 1000,
        //     verticalPosition: 'top',
        //     horizontalPosition: 'right',
        //     panelClass: type,
        // });
    }

    private getRangeLabel(page: number, pageSize: number, length: number): string {
        if (length === 0 || pageSize === 0) {
            return '0 de ' + length;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        // If the start index exceeds the list length, do not try and fix the end index to the end.
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return startIndex + ' - ' + endIndex + ' de ' + length;
    }
    sortElements() {

        alert('Alinhamento do Datasource');

        // console.log(toCompare);
        // this.dataSource.sortingDataAccessor = (item, property) => {
        //     switch (property) {
        //         case 'company.corporateName':
        //             return (item.company.corporateName as string).toUpperCase();
        //         default:
        //             return (item[property] as string).toUpperCase();
        //     }
        // };
    }
}
