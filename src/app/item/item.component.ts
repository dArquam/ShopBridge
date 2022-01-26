import { Component, OnInit } from '@angular/core';
import { Item } from '../shared/interfaces/item.interface';
import { ItemService } from './item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  mode!: any;
  loading=false;
  
  constructor(private itemService:ItemService) { }
  items!:Item[]

  ngOnInit(): void {
    
    this.getAllDatas()
    //this.itemService.modalOpen()
    this.itemService.modalObservable.subscribe(data=>{
      //this.displayStyle = data;
      this.openPopup(null);
    })
  }
  errorImage= "../../assets/images/book-1.png"
  getAllDatas() {
    this.loading = true
    this.itemService.getItems().subscribe((data:Item[])=>{
      console.log('data',data);
      if(data){
        this.items = data
      }
      this.loading=false

    },error=>{
      alert('something went wrong'+error.messgae)
      this.loading = false
    }
    )
  }
  onItemDelete(item:Item){
    console.log('calling....id',item.id);
    this.loading = true;
    this.itemService.deleteItem(item.id).subscribe(data=>{
      console.log(data)

      this.getAllDatas()
    
    },error=>{
      alert('something went wrong'+
      error.messgae)
    }
    )
    
    //this.itemService.getItems();
  }
  getItems(){
    this.itemService.getItems().subscribe(data=>data)
  }
  displayStyle = "none";
  openPopup(item:any) {
    this.mode = item
    console.log('item',item);
    this.displayStyle = "block";
    
  }
  modal_status(event:any)
{
console.log('event',event);
this.displayStyle = event;

}  
updateData(data:any){
  this.getAllDatas()
}

}
