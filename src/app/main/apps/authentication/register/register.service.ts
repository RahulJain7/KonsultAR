import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'



@Injectable({
	providedIn: 'root'
})

export class ApiService {

	baseurl= "http://127.0.0.1:8000";
	httpHeaders = new HttpHeaders({'Content-type':'application/json'});
	
	constructor(private http: HttpClient){}

	register(cred): Observable<any>{
		const body ={email: cred.email, password: cred.password, mobile: cred.mobile, first_name: cred.first_name, last_name: cred.last_name};
		console.log(this.baseurl);
		return this.http.post(this.baseurl + '/api/app_users/register/', body);
	}


}