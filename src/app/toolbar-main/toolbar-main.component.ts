import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar-main',
  templateUrl: './toolbar-main.component.html',
  styleUrls: ['./toolbar-main.component.css']
})
export class ToolbarMainComponent implements OnInit {
  constructor (private router: Router) { }

  ngOnInit() {
    this.checkAccess();
  }

  checkAccess() {
    if (!localStorage.getItem('userId'))
      this.router.navigate(['/login']);
  }

  clearCache() {
    localStorage.clear();
  }
}
