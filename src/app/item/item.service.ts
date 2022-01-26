
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { ApiRequestService } from "../services/api-request.service";
import { configObj } from "../services/config";
import { Item } from "../shared/interfaces/item.interface";


@Injectable({
    providedIn:'root'
})
export class ItemService{
     modalObservable = new Subject<string>()
    constructor(private apiRequestService:ApiRequestService){
    }
    url= `${configObj.apiBaseUrl}item.json`
   
   
    
    addItem(item:Item){
        console.log(this.url);
        return this.apiRequestService.postData(this.url,item)
    }
    updateItem(item:Item,id:string){
        return this.apiRequestService.putData(`${configObj.apiBaseUrl}item/${id}.json`,item)
    }
    deleteItem(id:string){
        return this.apiRequestService.deleteData(`${configObj.apiBaseUrl}item/${id}.json`)
    }
    getItems(){
        return this.apiRequestService.getData(this.url);
    }
    modalOpen(){
       return this.modalObservable.next('block')
    }
}