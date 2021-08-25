import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'shorten' })
export class ShortenPipe implements PipeTransform {
  transform(item: string) {
    if(item.length < 21){
        return item;
    }
    return item.substring(0,20) +'....pdf';
  }
}