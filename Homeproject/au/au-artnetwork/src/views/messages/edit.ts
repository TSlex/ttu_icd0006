import { Router } from 'aurelia-router';
import { autoinject, bindable } from 'aurelia-framework';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';

@autoinject
export class MessagesEdit {

    private subscriptions: Subscription[] = [];

    @bindable messageValue: string;

    constructor(private eventAggregator: EventAggregator, private router: Router) {
        this.subscriptions.push(
            this.eventAggregator.subscribe("onSubmit", () => this.onSubmit()),
            this.eventAggregator.subscribe("onCancel", () => this.onCancel())
        )
    }

    onSubmit() {
        console.log("submit")
        // this.router.navigateBack()
    }

    onCancel() {
        console.log("cancel")
        this.router.navigateBack()
    }

    detached() {
        this.subscriptions.forEach(subscription => {
            subscription.dispose();
        });
        this.subscriptions = [];
    }
}
