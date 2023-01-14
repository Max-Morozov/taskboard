import { Pipe, PipeTransform } from '@angular/core';
import { Buddy } from '../models/buddy';

@Pipe({
    name: 'userFilter'
})
export class UserFilterPipe implements PipeTransform {
    transform(value: Buddy[], textFilter: string) {
        let valueToReturn: Buddy[] = value;
        if (textFilter) {
            let regex = new RegExp(textFilter, 'gi');
            valueToReturn = valueToReturn.filter(t => regex.test(t.user.username));
        }
        return valueToReturn;
    }
}