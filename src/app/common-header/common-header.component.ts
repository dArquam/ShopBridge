import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item/item.service';

@Component({
  selector: 'app-common-header',
  templateUrl: './common-header.component.html',
  styleUrls: ['./common-header.component.css']
})
export class CommonHeaderComponent implements OnInit {

  constructor(private itemService:ItemService) { }

  ngOnInit(): void {
  }
  openPopup(){
    this.itemService.modalOpen()
  }

}
