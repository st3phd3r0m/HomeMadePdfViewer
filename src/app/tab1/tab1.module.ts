import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tab1Page } from './tab1.page';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { FoldersPipe } from './folders.pipe';
import { FilesPipe } from './files.pipe';
import { ShortenPipe } from './shorten.pipe';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    Tab1PageRoutingModule
  ],
  declarations: [Tab1Page, FoldersPipe, FilesPipe, ShortenPipe]
})
export class Tab1PageModule {}
