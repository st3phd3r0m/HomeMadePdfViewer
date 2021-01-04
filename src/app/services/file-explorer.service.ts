import { Injectable } from '@angular/core';
import { Plugins, FilesystemDirectory } from '@capacitor/core';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';

const { Filesystem } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class FileExplorerService {

  public files: statObject[] = [];
  public sdCardPath: string;

  constructor(public diagnostic: Diagnostic ) { }


  public async getListOfFiles(name?: string) {
    let regexDirtyDirectories = /^[^\w]/;
    let regexExtension = /\./;
    let regexPdfFiles = /\.pdf$/;
    this.files = [];
    let fileAndFolderNames: any;
    try {
      fileAndFolderNames = (await Filesystem.readdir({
        path: (name != null) ? name : '',
        directory: FilesystemDirectory.ExternalStorage
      }
      )).files;
    } catch (e) {
      console.error('Unable to read directory', e);
    }

    for await (let fileOrFolderName of fileAndFolderNames) {
      if( (!regexDirtyDirectories.test(fileOrFolderName) && !regexExtension.test(fileOrFolderName)) || regexPdfFiles.test(fileOrFolderName) ){
        try {
          let typeAndUri = (await Filesystem.stat({
            path: ((name != null) ? (name + '/') : '') + fileOrFolderName,
            directory: FilesystemDirectory.ExternalStorage
          }));
          this.files.push({
            name: fileOrFolderName,
            type: typeAndUri.type,
            uri: typeAndUri.uri,
          });
        } catch (e) {
          console.error('Unable to stat file', e);
        }
      }
    }
    return this.files;
  }

  public async sdCardDetails(): Promise<boolean> {
    return new Promise((resolve, reject)=>{
      this.diagnostic.getExternalSdCardDetails()
      .then( (datas) => {
        this.sdCardPath = datas[0].filePath;
        resolve(true);
      }, (errData)=>{
        console.log(JSON.stringify( errData ));
        reject( false);
      });
    });
  }

  public async getListOfFilesInSDCard(name?: string) {
    if(name == null){
      name = this.sdCardPath;
    }else{
      name = this.sdCardPath +'/'+name;
    }
    let regexDirtyDirectories = /^[^\w]/;
    let regexExtension = /\./;
    let regexPdfFiles = /\.pdf$/;
    this.files = [];
    let fileAndFolderNames: any;
    try {
      fileAndFolderNames = (await Filesystem.readdir({
        path: (name != null) ? name : ''
      }
      )).files;
    } catch (e) {
      console.error('Unable to read directory', e);
    }

    for await (let fileOrFolderName of fileAndFolderNames) {
      if( (!regexDirtyDirectories.test(fileOrFolderName) && !regexExtension.test(fileOrFolderName)) || regexPdfFiles.test(fileOrFolderName) ){
        try {
          let typeAndUri = (await Filesystem.stat({
            path: ((name != null) ? (name + '/') : '') + fileOrFolderName
          }));
          this.files.push({
            name: fileOrFolderName,
            type: typeAndUri.type,
            uri: typeAndUri.uri,
          });
        } catch (e) {
          console.error('Unable to stat file', e);
        }
      }
    }
    return this.files;
  }

}

export interface statObject {
  name: string;
  type: string;
  uri:string;
}




