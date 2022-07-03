// import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ItemService } from '../item/item.service';


import { CommonHeaderComponent } from './common-header.component';

describe('CommonHeaderComponent', () => {
  let component: CommonHeaderComponent;
  let fixture: ComponentFixture<CommonHeaderComponent>;
  let mockItemService:any;

  beforeEach(async () => {
    mockItemService = jasmine.createSpyObj({
      modalOpen: ()=>{}
    })
    await TestBed.configureTestingModule({
      declarations: [ CommonHeaderComponent ],
      providers:[
        {provide:ItemService, useValue:mockItemService}
      ],
      imports:[HttpClientModule]
      
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call #openPopUp when a is clicked',()=>{
   fixture.debugElement.query(By.css('a'))
   .triggerEventHandler('click',null);

    expect(mockItemService.modalOpen).toHaveBeenCalled()



  })

  
});
