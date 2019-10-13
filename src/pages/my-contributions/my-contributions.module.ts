import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyContributionsPage } from './my-contributions';

@NgModule({
  declarations: [
    MyContributionsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyContributionsPage),
  ],
})
export class MyContributionsPageModule {}
