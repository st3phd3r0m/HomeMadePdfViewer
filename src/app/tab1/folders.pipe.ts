import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'folders' })
export class FoldersPipe implements PipeTransform {
  transform(items: any[]) {
    return items.filter(u => u.type === 'directory');
  }
}