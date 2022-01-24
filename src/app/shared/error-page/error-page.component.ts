import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styles: [`
    li {
      cursor: pointer;
      color : blue;
    }
  `
  ]
})
export class ErrorPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
