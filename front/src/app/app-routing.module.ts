import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
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

const routes: Routes = [
  {
    path:'staff',
    pathMatch:'full',
    component:StaffListComponent,
  },
  {
    path:'staff-form',
    pathMatch:'full',
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
    pathMatch:'full',
    component:AboutUsComponent,
  },
  {
    path:'location',
    pathMatch:'full',
    component:LocationComponent,
  },
  {
    path:'service',
    pathMatch:'full',
    component:OurServiceComponent,
  },
  {
    path:'slider',
    pathMatch:'full',
    component:SliderComponent,
  },
  {
    path:'team',
    pathMatch:'full',
    component:TeamComponent,
  },
  {
    path:'tech',
    pathMatch:'full',
    component:TechComponent,
  },
  {
    path:'',
    pathMatch:'full',
    component:DashboardComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
