import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import {catchError, map} from "rxjs/operators"

@Injectable({
    providedIn:'root'
})
export class ApiRequestService{
    constructor(private http:HttpClient){
    }
    postData(url:any,input:any){
        console.log('i am here');
        
        return this.http.post(url,input).pipe(
            map((data:any)=>{
                console.log(data);
                return data;
            }),
            catchError((error)=>{
                console.log(error);
                
                return throwError('Something Wrong')
            })
        )
    }
    putData(url:any,input:any){
        console.log('i am here');
        
        return this.http.put(url,input).pipe(
            map((data:any)=>{
                console.log(data);
                return data;
            }),
            catchError((error)=>{
                console.log(error);
                
                return throwError('Something Wrong')
            })
        )
    }
    deleteData(url:any){
        console.log('i am here');
        
        return this.http.delete(url).pipe(
            map((data:any)=>{
                console.log(data);
                return data;
            }),
            catchError((error)=>{
                console.log(error);
                
                return throwError('Something Wrong')
            })
        )
    }
    getData(url:any){
        return this.http.get(url).pipe(
            map((data:any)=>{
                console.log(data);
                if(data){
                    const updatedData = Object.keys(data).map((key)=>{
                       return {
                           ...data[key],
                           id:key
    
                       }
                    }
                    )
                    return updatedData;
                }
                return [];
            }),
            catchError((error)=>{
                console.log(error);
                
                return throwError('Something Wrong')
            })
        )
    }
}