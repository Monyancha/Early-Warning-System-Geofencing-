import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContributionsPage } from './contributions';

@NgModule({
  declarations: [
    ContributionsPage,
  ],
  imports: [
    IonicPageModule.forChild(ContributionsPage),
  ],
})
export class ContributionsPageModule {}
