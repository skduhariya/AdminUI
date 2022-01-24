import { Pipe, PipeTransform } from '@angular/core';
import { Member } from '../app.component';

@Pipe({
  name: 'filterData',
  pure: false
})
export class FilterDataPipe implements PipeTransform {

  transform(items: Member[], val: string): any {
    if (!items || !val) {
      return items;
    }

    return items.filter((item: Member) => item.name.indexOf(val) > -1 || item.email.indexOf(val) > -1 || item.role.indexOf(val) > -1);
  }

}
