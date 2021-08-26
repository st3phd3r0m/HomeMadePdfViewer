import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { PopoverController } from '@ionic/angular';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  public pdfSrc: string;
  public filename: string;
  public isThereAFile: boolean = false;
  private fingersDistance: number;
  public count = 0;
  public zoomRate: number = 1;

  constructor(private route: ActivatedRoute, 
              public router: Router,
              public popover: PopoverController) {}

  ngOnInit(){
    let filename = this.route.snapshot.params['filename'];
    let uri = this.route.snapshot.params['uri'];
    if( filename != null && uri != null ){
      this.switchViewer(filename, uri);
    } else {
      this.manageIntents();
    }
  }

  public manageIntents(){
    let plugin = (<any>window).plugins;
    if( plugin ){
      plugin.intentShim.getIntent(
        (intent) => {
          if (intent.data && intent.type === 'application/pdf') { 
            let uri = intent.data;
            let filename: string;
            if(intent.extras){
              let uriArray = intent.extras['AbsolutePath'].split('/');
              filename = uriArray[ uriArray.length-1];
            }else{
              let uriArray = uri.split('/');
              filename = uriArray[ uriArray.length-1];
            }
            this.switchViewer(filename, uri);
          }else{
            console.log("intent error")
          }}, 
        () => console.log("intent error")
      );
    }
  }

  public switchViewer(filename: string, uri: string){
    if(filename == null){
      this.isThereAFile = false;
    }else{
      this.isThereAFile = true;
      this.filename = filename;
      this.pdfSrc =  Capacitor.convertFileSrc( uri );
    }
  }

  public onBrowse(){
    this.router.navigate(['tab1'] );
  }

  public onFingersStart($e: any){
    let touches = $e.touches;
    if(touches.length > 1){
      let pointA = touches.item(0);
      let pointB = touches.item(1);
      let vecY = pointA.pageY - pointB.pageY;
      let vecX = pointA.pageX - pointB.pageX;
      this.fingersDistance = Math.sqrt(vecY*vecY+vecX*vecX);
    }
  }

  public onFingersMove($e: any){
    let touches = $e.touches;
    if(touches.length > 1 && this.count >= 3 ){
      let pointA=touches.item(0);
      let pointB=touches.item(1);
      let vecY=pointA.pageY-pointB.pageY;
      let vecX=pointA.pageX-pointB.pageX;
      this.zoomRate += Math.trunc((Math.sqrt(vecY*vecY+vecX*vecX)/this.fingersDistance - 1)*10)/10;

      console.log( this.zoomRate )
      this.count = 0;
    }else if(this.count<3){
      this.count++;
    }
  }

  public onReset(){
    this.zoomRate = 1;
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
