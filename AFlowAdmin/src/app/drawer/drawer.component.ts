import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css']
})
export class DrawerComponent implements OnInit {
  links = ['菜单一', '菜单二', '菜单三', '菜单四', '菜单五', '菜单六'];

  ngOnInit(): void {
  }

}
