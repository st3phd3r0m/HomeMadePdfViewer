import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { HeaderComponent } from '../header/header.component';
import { FileExplorerService } from '../services/file-explorer.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public directories: Object[] = [];
  public name: string[] = [];
  public browseInSDCard: boolean = false;

  constructor(public fileExplorerService: FileExplorerService, 
              public router: Router,
              public route: ActivatedRoute,
              public popover: PopoverController) { }

  async ngOnInit() {
    this.browseInSDCard = this.route.snapshot.params['browseInSDCard'];
    this.getDirectories();
  }

  public goDeeper(name?: string) {
    this.name.push(name);
    name = this.name.join('/');
    this.getDirectories(name);
  }

  public goHigher() {
    this.name.pop();
    let name = this.name.join('/');
    this.getDirectories(name);
  }

  public async getDirectories(name?: string) {
    if(this.browseInSDCard){
      this.directories = await this.fileExplorerService.getListOfFilesInSDCard(name); 
    }else{
      this.directories = await this.fileExplorerService.getListOfFiles(name);     
    }
  }

  public async openPdf(uri: string, filename: string) {
    let regexPdfFiles = /\.pdf$/;
    if (regexPdfFiles.test(uri)) {
      this.router.navigate(['tab2', uri, filename] );
    }
  }

  public async presentPopover(ev: any) {
    let popover = await this.popover.create({
      component: HeaderComponent,
      cssClass: 'contact-popover',
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
}