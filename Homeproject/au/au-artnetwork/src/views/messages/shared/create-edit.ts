import { autoinject, bindable } from 'aurelia-framework';

@autoinject
export class MessagesCreateEdit {

    @bindable messageValue: string;

    constructor() {
    }
}
