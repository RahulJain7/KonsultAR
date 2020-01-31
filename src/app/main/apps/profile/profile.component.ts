import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { fuseAnimations } from '@fuse/animations';
import {token, getToken} from '../../../tokens';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
    selector     : 'profile',
    templateUrl  : './profile.component.html',
    styleUrls    : ['./profile.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations,
})
export class ProfileComponent
{
    /**
     * Constructor
     */
    httpHeaders;
    token;
    fileData = new FormData();
    fileToUpload;
    src: string;
    user: any;
    constructor(private _httpClient: HttpClient)
    {

    }

ngOnInit(): void
    {   this.token = getToken();
        this.httpHeaders = new HttpHeaders({
        "Authorization": "Bearer " + this.token});
        this._httpClient.get('http://127.0.0.1:8000/api/app_users/info/', {headers: this.httpHeaders}).subscribe(
                    data => {
                        console.log(data);
                        this.user = data;
                        console.log(this.user);
                    },
                    error => {
                    console.log(error);
                    }
                );
    }

uploadFile($event){
        console.log({'yes':'yes'})
        this.fileToUpload = $event.target.files.item(0);
        //const fileData = new FormData();
        this.fileData.append('file', this.fileToUpload);
        console.log(this.fileData);
        console.log(this.fileToUpload);
        this.token = getToken();
        this.httpHeaders = new HttpHeaders({
        "Authorization": "Bearer " + this.token});
        this._httpClient.post('http://127.0.0.1:8000/api/app_users/avatar/', this.fileData, {headers: this.httpHeaders}).subscribe(
            data => {
                console.log(data);
                this._httpClient.get('http://127.0.0.1:8000/api/app_users/avatar/', {headers: this.httpHeaders}).subscribe(
                    data => {
                        console.log(data);
                        this.user.source = data['source'];
                        console.log(this.user);
                    },
                    error => {
                    console.log(error);
                    }
                );
            },
            error => {
                console.log(error);
            }
    );
    }

    }