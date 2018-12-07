import {Pipe, PipeTransform} from '@angular/core';
import { collectExternalReferences } from '@angular/compiler';
import {ListStructure} from '../dataTypes/ListStructure';
/*import { toDate } from '@angular/common/src/i18n/format_date';*/

@Pipe({
    name: 'orderByLastDate'
})
export class OrderBy{

 transform(array: Array<ListStructure>) : Array<ListStructure>{
      if (array == null ) return null;

       return Array.from(array).sort((a: any, b: any) => { 
         if(a.maj > b.maj) return -1;
         else if(a.maj < b.maj) return 1;
         else return 0;
       });

 }
}