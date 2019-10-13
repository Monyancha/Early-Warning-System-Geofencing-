import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewReportPage } from './new-report';

@NgModule({
  declarations: [
    NewReportPage,
  ],
  imports: [
    IonicPageModule.forChild(NewReportPage),
  ],
})
export class NewReportPageModule {}
