import { Component, OnInit } from '@angular/core';
import { ReaddirResult, StatResult } from '@capacitor/core';
import { FileExplorerService } from '../services/file-explorer.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  private directories: Object[] = [];
  private name: string[] = [];

  constructor(public fileExplorerService: FileExplorerService) {}
  
  async ngOnInit() {
    this.getDirectories();
  }

  public goDeeper(name?: string){
    this.name.push(name);
    name = this.name.join('/');
    this.getDirectories(name);
  }

  public goHigher(){
    this.name.pop();
    let name = this.name.join('/');
    this.getDirectories(name);
  }

  public async getDirectories(name?: string){
    this.directories = await this.fileExplorerService.getListOfFiles(name);
  }




}