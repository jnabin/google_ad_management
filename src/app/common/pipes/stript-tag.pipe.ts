import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'striptTag'
})
export class StriptTagPipe implements PipeTransform {

  step: any;
  transform(stringList: any[]): any[] {
    stringList.forEach((element, index) => {
      if (typeof element === 'string') {
        this.step = element.replace(/<[^>]+>/gm, '');
        stringList[index] = this.step.replace(/&nbsp;/gm, '');
      }
    });
    return stringList;
  }

}
