import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  @Input() repeat: number = 1;
  @Input() isSmall = true;

  @Input() width: string = '';
  @Input() height: string = '';

  @Input() cssClass: string = '';
  

  constructor() { }

  ngOnInit(): void {
  }

}
