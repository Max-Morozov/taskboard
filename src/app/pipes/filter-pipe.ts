import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task';

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(value: Task[], textFilter: string, sizeFilter: string) {
        let valueToReturn: Task[] = value;
        if (sizeFilter) {
            valueToReturn = valueToReturn.filter(t => t.points === +sizeFilter);
        }
        if (textFilter) {
            let regex = new RegExp(textFilter, 'gi');
            valueToReturn = valueToReturn.filter(t => regex.test(t.title) || regex.test(t.description));
        }
        return valueToReturn;
    }
}