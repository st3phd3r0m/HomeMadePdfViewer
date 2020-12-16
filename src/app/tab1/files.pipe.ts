import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'files' })
export class FilesPipe implements PipeTransform {
  transform(items: any[]) {
    return items.filter(u => u.type === 'file');
  }
}