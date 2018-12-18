import {AfterViewInit, Component, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {Profile} from '../app.component';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit, AfterViewInit {
  private profile: Profile;

  cardNoPadding = {
    padding: 0
  };
  cardBottomPadding = {
    padding: '20px 24px 8px',
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
  ];

  height = 46;
  statistics_comments = [];
  statistics_views = [];
  statistics_posts = [];
  scale = [{
    dataKey: 'sales',
    tickInterval: 20,
  }];

  lineScale = [{
    dataKey: 'value',
    min: 0,
  }, {
    dataKey: 'year',
    min: 0,
    max: 1,
  }];


  handleChange({file, fileList}): void {
    const status = file.status;
    if (status !== 'uploading') {
      console.log(file, fileList);
    }
    if (status === 'done') {
      this.toast.success(`${file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      this.toast.error(`${file.name} file upload failed.`);
    }
  }

  constructor(private toast: NzMessageService, private authService: AuthService) {
  }

  ngOnInit() {
    this.profile = this.authService.profile;
    setTimeout(() => {
      this.statistics_comments = [
        {year: '1951 年', sales: 38},
        {year: '1952 年', sales: 52},
        {year: '1956 年', sales: 61},
        {year: '1957 年', sales: 145},
        {year: '1958 年', sales: 48},
        {year: '1959 年', sales: 38},
        {year: '1960 年', sales: 38},
        {year: '1962 年', sales: 38},
      ];

      this.statistics_views = [
        {year: '1991', value: 15468},
        {year: '1992', value: 16100},
        {year: '1993', value: 15900},
        {year: '1994', value: 17409},
        {year: '1995', value: 17000},
        {year: '1996', value: 31056},
        {year: '1997', value: 31982},
        {year: '1998', value: 32040},
        {year: '1999', value: 33233}
      ];

      this.statistics_posts = [
        {year: '1991', value: 3},
        {year: '1992', value: 4},
        {year: '1993', value: 3.5},
        {year: '1994', value: 5},
        {year: '1995', value: 4.9},
        {year: '1996', value: 6},
        {year: '1997', value: 7},
        {year: '1998', value: 9},
        {year: '1999', value: 13},
      ];
    }, 0);

  }

  ngAfterViewInit(): void {

  }


}
