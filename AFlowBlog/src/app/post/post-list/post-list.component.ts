import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  gridStyle = {
    padding: 0,
    margin: '5px',
    width: '40px',
    height: '40px'
  };

  actionStyle = {
    padding: 0
  };

  data = [
    {
      title: 'Ant Design Title 1'
    },
    {
      title: 'Ant Design Title 2'
    },
    {
      title: 'Ant Design Title 3'
    },
    {
      title: 'Ant Design Title 4'
    }
    ,
    {
      title: 'Ant Design Title 5'
    }
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
