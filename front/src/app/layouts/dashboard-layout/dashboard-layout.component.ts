import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent {
  isFrontendEditorActive: boolean = false;
  isManagementSystemActive: boolean = true;

  activateFrontendEditor() {
    this.isFrontendEditorActive = true;
    this.isManagementSystemActive = false;
  }

  activateManagementSystem() {
    this.isFrontendEditorActive = false;
    this.isManagementSystemActive = true;
  }
}
