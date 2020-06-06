import { Router } from 'aurelia-router';
import { autoinject, bindable } from 'aurelia-framework';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';


@autoinject
export class MessagesCreate{

    constructor(private eventAggregator: EventAggregator, private router: Router) {
        this.eventAggregator.subscribe("onSubmit", () => this.onSubmit())
        this.eventAggregator.subscribe("onCancel", () => this.onCancel())
    }

    onSubmit(){
        console.log("submit")
        // this.router.navigateBack()
    }

    onCancel(){
        console.log("cancel")
        this.router.navigateBack()
    }
}
