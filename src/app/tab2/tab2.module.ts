import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tab2Page } from './tab2.page';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    Tab2PageRoutingModule,
    PdfViewerModule
  ],
  declarations: [Tab2Page]
})
export class Tab2PageModule {}
