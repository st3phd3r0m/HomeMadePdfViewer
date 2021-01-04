import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { FileExplorerService } from '../services/file-explorer.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  public isThereSdCard: boolean;

  constructor(public router: Router, 
              public fileExplorerService: FileExplorerService,
              public popover: PopoverController) { }

  async ngOnInit() {
    this.isThereSdCard = await this.fileExplorerService.sdCardDetails();
  }

  public onNavigate(browseInSDCard?: boolean){
    this.popover.dismiss();
    if( browseInSDCard != null && browseInSDCard ){
      this.router.navigate(['tab1', browseInSDCard] );
    }else{
      this.router.navigate(['tab1'] );
    }
  }

}
