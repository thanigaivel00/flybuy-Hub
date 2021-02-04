import { IProduct } from './../components/products/product';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MystacksdataService {
  constructor(private http:HttpClient) { }

 GetUser(): Observable<any> 
 {

   return this.http.get('http://localhost:3000/getdata');
 } 
  updatedata(data:any): Observable<any>
  {
    const header={'Content-Type': 'application/json'};
    return this.http.post('http://localhost:3000/uploaddata',data,{headers:header});
  }
  updatestock(aUrl:string,datas:any): Observable<any>
  {
    
    return this.http.post(aUrl,datas);
  }
  getimage(id:any): Observable<any>
  {

    return this.http.get('http://localhost:3000/ProductImage/'+id,{responseType:"blob"});
  }
  getBranchInfo():Observable<any>
  {
    return this.http.get('http://localhost:3000/getBranch');
  }
}