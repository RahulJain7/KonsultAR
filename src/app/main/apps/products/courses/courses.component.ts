import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import {token, getToken} from '../../../../tokens';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { currentProduct, getProduct } from '../../../../CurrentProduct';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Inject} from '@angular/core';

export interface DialogData {
  product_name: string;
  category: string;
  length: string;
  title:string;
  updated: string;
  content : string;
}

@Component({
    selector   : 'courses',
    templateUrl: './courses.component.html',
    styleUrls  : ['./courses.component.scss'],
    animations : fuseAnimations
})
export class CoursesComponent implements OnInit, OnDestroy
{
    courses: any[];
    filteredCourses: any[];
    searchTerm: string;
    httpHeaders;
    token;
    product_name: string;
    product: any;
    newcourse: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _httpClient: HttpClient,
        public dialog: MatDialog
    )
    {
        // Set the defaults
        this.searchTerm = '';
        
        this.product_name = '';
        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this.newcourse = {'product_name': '',
                          'category': '',
                          'length': '',
                          'title': '',
                          'updated': '',
                          'content' : ''}
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {

        this.product_name = getProduct()['name'];
        this.token = getToken();
        this.httpHeaders = new HttpHeaders({
        "Authorization": "Bearer " + this.token});
        this._httpClient.get('http://127.0.0.1:8000/api/products/info/'+this.product_name+'/',{headers: this.httpHeaders}).subscribe(
                    data => {
                        this.product = data;
                        this.courses = data['cources'];
                        this.filteredCourses = this.courses;
                        console.log(data);
                    },
                    error => {
                    console.log(error);
                    }
                );
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

    newCourse(): void
    {

      const dialogRef = this.dialog.open(NewCourseDialog, {
      width: '650px',
      data: {
      category: this.newcourse['category'],
      length: this.newcourse['length'],
      title: this.newcourse['title'],
      content : this.newcourse['content'],
       }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.newcourse = result;
      this.newcourse['product_name'] = this.product['name'];
      this.newcourse['updated'] = 'Monday';
      console.log(this.newcourse);
      this.token = getToken();
      this.httpHeaders = new HttpHeaders({
      "Authorization": "Bearer " + this.token});
      this._httpClient.post('http://127.0.0.1:8000/api/products/add-course/',this.newcourse,{headers: this.httpHeaders}).subscribe(
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

 
    filterCoursesByTerm(): void
    {
        const searchTerm = this.searchTerm.toLowerCase();

        // Search
        if ( searchTerm === '' )
        {
            this.filteredCourses = this.courses;
        }
        else
        {
            this.filteredCourses = this.courses.filter((course) => {
                return course.title.toLowerCase().includes(searchTerm);
            });
        }
    }
}

@Component({
  selector: 'new-course-dialog',
  templateUrl: './new-course-dialog.html',
})

export class NewCourseDialog {

  constructor(
    public dialogRef: MatDialogRef<NewCourseDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
