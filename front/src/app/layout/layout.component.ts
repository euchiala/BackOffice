import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
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
