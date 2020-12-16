import { Injectable } from '@angular/core';
import { Plugins, Capacitor, FilesystemDirectory, StatResult } from '@capacitor/core';
import { Platform } from '@ionic/angular';

const { Filesystem } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class FileExplorerService {

  public files: statObject[] = [];

  constructor(private platForm: Platform) { }

  public async createFolder(folderName: string) {
    this.platForm.ready().then(
      () => {
        Filesystem.mkdir({
          path: folderName,
          directory: FilesystemDirectory.Documents
        });
      });
  }

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
          let type = (await Filesystem.stat({
            path: ((name != null) ? (name + '/') : '') + fileOrFolderName,
            directory: FilesystemDirectory.ExternalStorage
          })).type;
          
          this.files.push({
            name: fileOrFolderName,
            type: type
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
}



