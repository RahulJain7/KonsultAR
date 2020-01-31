import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import {token, getToken} from '../../../../tokens';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
    selector   : 'edit',
    templateUrl: './edit.component.html',
    styleUrls  : ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy
{
    form: FormGroup;
    work: FormGroup;
    contact: FormGroup;
    httpHeaders;
    token;
    about: {};
    // Horizontal Stepper
    horizontalStepperStep1: FormGroup;
    horizontalStepperStep2: FormGroup;
    horizontalStepperStep3: FormGroup;

    // Vertical Stepper
    verticalStepperStep1: FormGroup;
    verticalStepperStep2: FormGroup;
    verticalStepperStep3: FormGroup;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _formBuilder: FormBuilder,
        private _httpClient: HttpClient
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this.about = {'general':{},'work':{}};
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Reactive Form
        console.log('in edit');
        this.form = this._formBuilder.group({
            gender  : ['', Validators.required],
            birthday : ['', Validators.required],
            address   : ['', Validators.required],
            address2  : ['', Validators.required],
            city      : ['', Validators.required],
            state     : ['', Validators.required],
            postalCode: ['', [Validators.required, Validators.maxLength(5)]],
            country   : ['', Validators.required],
            about: ['',Validators.required],
        });

        this.work = this._formBuilder.group({
            occupation: ['',Validators.required],
            skills: ['',Validators.required],
            jobs: this._formBuilder.array([this._formBuilder.group({'company':'','date':''})])
        }); 

        this.contact = this._formBuilder.group({
            address: ['',Validators.required],
            tel: ['',Validators.required],
            emails: ['',Validators.required],
            websites: ['',Validators.required],
        });

    }

        get Jobs() {
        return this.work.get('jobs') as FormArray;
        }

        addJob(){
        this.Jobs.push(this._formBuilder.group({'company':'','date':''}));
        }

        deleteJob(index){
        this.Jobs.removeAt(index);
        }



        submit(){
        this.about = {'general':{'birthday':'','locations':''},'work':{},'contact':{}};
        console.log("in submit");
        this.about['general'] = this.form.getRawValue();
        this.about['general']['locations'] = this.form.getRawValue()['city'] + ' ' + this.form.getRawValue()['country'];
        this.about['general']['birthday'] = this.form.getRawValue()['birthday'].format();
        this.about['work'] = this.work.getRawValue();
        this.about['contact']['address'] = [this.contact.getRawValue()['address']];
        this.about['contact']['tel'] = this.contact.getRawValue()['tel'];
        this.about['contact']['emails'] = [this.contact.getRawValue()['emails']];
        this.about['contact']['websites'] = [this.contact.getRawValue()['websites']];
        console.log(this.about);
        this.token = getToken();
        this.httpHeaders = new HttpHeaders({
        "Authorization": "Bearer " + this.token});
        this._httpClient.post('http://127.0.0.1:8000/api/app_users/about/', this.about,{headers: this.httpHeaders}).subscribe(
                    data => {
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

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Finish the horizontal stepper
     */
    finishHorizontalStepper(): void
    {
        alert('You have finished the horizontal stepper!');
    }

    /**
     * Finish the vertical stepper
     */
    finishVerticalStepper(): void
    {
        alert('You have finished the vertical stepper!');
    }
}
