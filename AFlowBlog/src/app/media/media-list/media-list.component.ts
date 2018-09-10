import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-media-list',
  templateUrl: './media-list.component.html',
  styleUrls: ['./media-list.component.css']
})
export class MediaListComponent implements OnInit {

  data = [
    {
      title: 'Title 1',
      src: 'https://via.placeholder.com/300*x200'
    },
    {
      title: 'Title 2',
      src: 'https://via.placeholder.com/300*x200'
    },
    {
      title: 'Title 3',
      src: 'https://via.placeholder.com/300*x200'
    },
    {
      title: 'Title 4',
      src: 'https://via.placeholder.com/300*x200'
    },
    {
      title: 'Title 5',
      src: 'https://via.placeholder.com/300*x200'
    },
    {
      title: 'Title 6',
      src: 'https://via.placeholder.com/300*x200'
    },
    {
      title: 'Title 7',
      src: 'https://via.placeholder.com/300*x200'
    }
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
