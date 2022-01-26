import { Component, Input, OnChanges, OnInit, Output, SimpleChanges ,EventEmitter, AfterViewChecked} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemService } from '../item/item.service';
import { Item } from '../shared/interfaces/item.interface';



@Component({
  selector: 'app-item-modal',
  templateUrl: './item-modal.component.html',
  styleUrls: ['./item-modal.component.css']
})
export class ItemModalComponent implements OnInit,OnChanges {
  @Output() modal_status = new EventEmitter<string>()
  @Output() updateData = new EventEmitter()

  @Input() displayStyle:string="none";
  @Input() mode!:Item;
  itemFormGroup!: FormGroup;
  loading=false;
  error=true;
  constructor(private fb: FormBuilder,
  private itemService:ItemService) { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('changesx',changes);
    
    if(this.mode ){
      this.error=true
      this.itemFormGroup.setValue({
        
        name:this.mode.name,
        image_url:this.mode.image_url,
        price:this.mode.price,
        cut_price:this.mode.cut_price,
        description:this.mode.description,

      })

    }else{
    
      if(this.itemFormGroup){
        console.log(this.itemFormGroup.controls.name);
        
        this.itemFormGroup.reset()
      }
    }
    
    
  }
  
  
  ngOnInit(): void {
    console.log('mode in mode',this.mode);
    this.itemFormGroup =this.fb.group({
      name:['',Validators.required],
      image_url:[ '',],
      price:[ '',Validators.required],
      cut_price:['',Validators.required],
      description:['',Validators.required],

    })
  }
  
  
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  this.modal_status.emit('none')
  }
  savePopup(){
    const itemForm = this.itemFormGroup.controls;
   
    console.log('form',this.itemFormGroup)
    if(this.itemFormGroup
      .invalid){
       // this.modal_status.emit('none')
        return ;
      }
      this.loading=true;
    console.log('form',itemForm?.name.value)
    const payload:any = {
      name:itemForm?.name.value,
      image_url:itemForm?.image_url.value || 'https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      price:itemForm?.price.value,
      cut_price:itemForm?.cut_price.value,
      description:itemForm?.description.value,
      
    }
    if(this.mode){
      this.itemService.updateItem(payload,this.mode.id).subscribe(data=>{
        this.loading=false;
        this.updateData.emit(data)  
        this.modal_status.emit('none')
        
      },error=>{
        alert('something wrong'+error.message)
        this.loading =false;
      }
        )
      return;
    }
    this.itemService.addItem(payload).subscribe(data=>{
      this.loading = false
    this.updateData.emit(data),
    this.modal_status.emit('none')

    },error=>{
      this.loading=false;
      alert('something went wrong'+error.message)
    }
    )
  }


}
