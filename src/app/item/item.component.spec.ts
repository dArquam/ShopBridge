import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';

import { ItemComponent } from './item.component';
import { ItemService } from './item.service';
import {Item} from '../shared/interfaces/item.interface'
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ItemModalComponent } from '../item-modal/item-modal.component';
import { ReactiveFormsModule } from '@angular/forms';



describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;
  let mockItemService:any;
  let ITEMS:Item[];


  beforeEach(async () => {
     ITEMS = [
      {
        name:'Danish',
        image_url:'xyz',
        price:123,
        cut_price:123,
        description:'xya',
        id:'xyz'
    
    }
    ]
    mockItemService = jasmine.createSpyObj(['getItems','deleteItem','getItems'])
    await TestBed.configureTestingModule({
      imports:[CommonModule,ReactiveFormsModule],
      declarations: [ ItemComponent,ItemModalComponent ],
      providers:[
        {provide:ItemService, useValue:mockItemService},
      ],
      schemas:[NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;

    mockItemService.modalObservable = new Subject<any>()
    //fixture.detectChanges();
    
  });
  it('should set items in #getAddDatas',()=>{
    
    // mockItemService.modalObservable.next(null);
    mockItemService.getItems.and.returnValue(of(ITEMS));
    spyOn(fixture.componentInstance,'openPopup')
    component.openPopup(null)

    fixture.detectChanges();

    expect(component.openPopup).toHaveBeenCalledWith(null)
    expect(fixture.componentInstance.items.length).toBe(1);
  })
  it('should delete item when delete icon is clicked',()=>{
    mockItemService.deleteItem.and.returnValue(of(2));
    mockItemService.getItems.and.returnValue(of(ITEMS));
    component.loading= false;

    fixture.detectChanges();
    const deleteButton = fixture.debugElement.query(By.css('.fa-trash'));
    console.log('delete button',deleteButton)  
   
    
    

    
    deleteButton.triggerEventHandler('click',null);
     component.items=[]
    //fixture.detectChanges()
    expect(component.loading).toBeFalsy()
    expect(component.items.length).toBe(0)
  })

  it('should call openPopup',()=>{
    // mockItemService.getItems.and.returnValue(of(ITEMS));
    //spyOn(component,'openPopup');
    //component.mode = ITEMS[0];
    // component.displayStyle = 'block';
   
    //fixture.detectChanges();

    //  const ItemModalComDE = (fixture.debugElement.query(By.directive(ItemModalComponent)));

    //  (<ItemModalComponent>ItemModalComponent)
    // console.log('ItemModalComDE',ItemModalComDE);
    // (<ItemModalComponent>ItemModalComDE.componentInstance).itemFormGroup ;
    // (<ItemModalComponent>ItemModalComDE.componentInstance).
     
     
    // fixture.debugElement.query(By.css('fa-edit')).
    // triggerEventHandler('click',null);
     


    // expect(component.openPopup).toHaveBeenCalledWith(ITEMS[0])

  })
});
