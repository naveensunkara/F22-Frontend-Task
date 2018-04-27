import {Card} from './card';
export class List {
    title: string;
    card?: Array<Card>;
    constructor(values: Object = {}){
        Object.assign(this,values);
    }
}

