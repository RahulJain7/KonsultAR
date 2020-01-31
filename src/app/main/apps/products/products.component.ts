import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import {token, getToken} from '../../../tokens';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { currentProduct, getProduct, setProduct } from '../../../CurrentProduct';
import { RouterModule, Routes, Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Inject} from '@angular/core';

export interface DialogData {
  name: string;
}

@Component({
    selector     : 'products',
    templateUrl  : './products.component.html',
    styleUrls    : ['./products.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ProductsComponent implements OnInit, OnDestroy
{
    boards: any[];
    products: any;
    token: any;
    courses: any;
    httpHeaders: any;
    newproduct: string;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {Router} _router
     * @param {ScrumboardService} _scrumboardService
     */
    constructor(
        private  _router: Router,
        private _httpClient: HttpClient,
        private router: Router,
        public dialog: MatDialog
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this.newproduct = '';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.token = getToken();
        this.httpHeaders = new HttpHeaders({
        "Authorization": "Bearer " + this.token});
        this._httpClient.get('http://127.0.0.1:8000/api/app_users/products/',{headers: this.httpHeaders}).subscribe(
                    data => {
                        this.products = data;
                        console.log(data);
                    },
                    error => {
                    console.log(error);
                    }
                );
    }


    productSelected(product_name): void
    {
        setProduct(product_name);
        console.log(this.router.url)
        this.router.navigate(['apps/courses'])
    }
    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * New board
     */
    newProduct(): void
    {

      const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {name: this.newproduct}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.newproduct = result;
      console.log(this.newproduct);
      this.token = getToken();
      this.httpHeaders = new HttpHeaders({
      "Authorization": "Bearer " + this.token});
      const body = {"name":this.newproduct};
      this._httpClient.post('http://127.0.0.1:8000/api/products/create/',body,{headers: this.httpHeaders}).subscribe(
                    data => {
                        console.log(data);
                    },
                    error => {
                    console.log(error);
                    }
                );

    });

        // const newBoard = new Board({});
        // this._scrumboardService.createNewBoard(newBoard).then(() => {
        //     this._router.navigate(['/apps/scrumboard/boards/' + newBoard.id + '/' + newBoard.uri]);
      
    }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.html',
})

export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
