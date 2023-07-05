import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffListComponent } from './staff-list/staff-list.component';
import { StaffFormComponent } from './staff-form/staff-form.component';
import { StaffSheetComponent } from './staff-sheet/staff-sheet.component';
import { StaffPlanningComponent } from './staff-planning/staff-planning.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { LocationComponent } from './location/location.component';
import { OurServiceComponent } from './our-service/our-service.component';
import { SliderComponent } from './slider/slider.component';
import { TeamComponent } from './team/team.component';
import { TechComponent } from './tech/tech.component';
import { DashboardLayoutComponent } from '../layouts/dashboard-layout/dashboard-layout.component';
import { SliderContentComponent } from './slider-content/slider-content.component';
import { ServiceContentComponent } from './service-content/service-content.component';
import { PartnersComponent } from './partners/partners.component';

const routes: Routes = [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path:'staff',
        component:StaffListComponent,
      },
      {
        path:'staff-form',
        component:StaffFormComponent,
      },
      {
        path: 'staff/:id/edit',
        pathMatch: 'full',
        component: StaffFormComponent,
      },
      {
        path: 'staff/:id/sheet',
        pathMatch: 'full',
        component: StaffSheetComponent,
      },
      {
        path: 'staff/:id/planning',
        pathMatch: 'full',
        component: StaffPlanningComponent,
      },
      {
        path:'about',
        component:AboutUsComponent,
      },
      {
        path:'location',
        component:LocationComponent,
      },
      {
        path:'service-form',
        component:OurServiceComponent,
      },
      {
        path:'service/:id/edit',
        component:OurServiceComponent,
      },
      {
        path:'service',
        component:ServiceContentComponent,
      },
      {
        path:'slider-form',
        component:SliderComponent,
      },
      {
        path:'slider/:id/edit',
        component:SliderComponent,
      },
      {
        path:'slider',
        component:SliderContentComponent,
      },
      {
        path:'team',
        component:TeamComponent,
      },
      {
        path:'tech',
        component:TechComponent,
      },
      {
        path:'partners',
        component:PartnersComponent,
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

