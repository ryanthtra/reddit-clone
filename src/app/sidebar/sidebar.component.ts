import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  // templateUrl: './sidebar.component.html',
  template: `
    <div id="sidebar">
      Sidebar will go here
    </div>
  `,
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
