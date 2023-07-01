import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent{
  isFrontendEditorActive: boolean = false;
  isManagementSystemActive: boolean = true;

  activateFrontendEditor() {
    localStorage.setItem('side', 'isFrontendEditorActive');
    this.isFrontendEditorActive = true;
    this.isManagementSystemActive = false;
  }

  activateManagementSystem() {
    localStorage.setItem('side', 'isManagementSystemActive');
    this.isFrontendEditorActive = false;
    this.isManagementSystemActive = true;
  }
  logout(){
    localStorage.clear();
    window.location.href='http://localhost:4200/#/login'
  }
  ngOnInit(): void {
    const side = localStorage.getItem('side');
    if (side == 'isFrontendEditorActive'){
      this.isFrontendEditorActive = true;
      this.isManagementSystemActive = false;
    } else if (side == 'isManagementSystemActive'){
      this.isFrontendEditorActive = false;
      this.isManagementSystemActive = true;
    }
  }
}
