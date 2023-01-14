import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'textFilter'
})
export class TextFilterPipe implements PipeTransform {
    transform(value: any, keys: string, textFilter: string) {
        if (!textFilter)
            return value;
        
        return (value || []).filter((item: any) => keys.split(',').some(key => item.hasOwnProperty(key) && new RegExp(textFilter, 'gi').test(item[key])));
    }
}