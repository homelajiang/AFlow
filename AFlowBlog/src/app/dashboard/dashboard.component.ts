import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  cardNoPadding = {
    padding: 0
  };
  cardBottomPadding = {
    padding: '20px 24px 8px',
  };

  constructor() {
  }

  ngOnInit() {
  }

}
