import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule} from '@angular/material/dialog';
import { MatCardModule} from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatListModule} from '@angular/material/list';
import { MatMenuModule} from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule} from "@angular/flex-layout";

import { FullCalendarModule } from '@fullcalendar/angular';

import { DashboardComponent } from './dashboard/dashboard.component';
import { StaffListComponent } from './dashboard/staff-list/staff-list.component';
import { StaffSheetComponent } from './dashboard/staff-sheet/staff-sheet.component';
import { StaffPlanningComponent } from './dashboard/staff-planning/staff-planning.component';
import { StaffFormComponent } from './dashboard/staff-form/staff-form.component';
import { SliderComponent } from './dashboard/slider/slider.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { OurServiceComponent } from './dashboard/our-service/our-service.component';
import { TechComponent } from './dashboard/tech/tech.component';
import { TeamComponent } from './dashboard/team/team.component';
import { LocationComponent } from './dashboard/location/location.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    StaffListComponent,
    StaffSheetComponent,
    StaffPlanningComponent,
    StaffFormComponent,
    SliderComponent,
    AboutUsComponent,
    OurServiceComponent,
    TechComponent,
    TeamComponent,
    LocationComponent,
    LoginComponent,
    RegisterComponent,
    AuthLayoutComponent,
    DashboardLayoutComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatChipsModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    FullCalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
