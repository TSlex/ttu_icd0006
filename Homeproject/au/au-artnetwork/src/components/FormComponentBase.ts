import { Router } from 'aurelia-router';
import { autoinject, bindable } from 'aurelia-framework';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';
import { AppState } from 'state/state';

@autoinject
export abstract class FormComponentBase {

    private subscriptions: Subscription[] = [];

    protected errors: string[] = [];

    constructor(
        protected eventAggregator: EventAggregator,
        protected router: Router,
        protected appState: AppState) {

        this.subscriptions.push(
            this.eventAggregator.subscribe("onSubmit", () => this.onSubmit()),
            this.eventAggregator.subscribe("onCancel", () => this.onCancel())
        )
    }

    abstract onSubmit(): void
    abstract onCancel(): void

    lockBottons() {
        let buttons = document.querySelectorAll('.btn')
        buttons.forEach((button: HTMLButtonElement) => {
            button.disabled = true;
        })
    }

    unlockBottons() {
        let buttons = document.querySelectorAll('.btn')
        buttons.forEach((button: HTMLButtonElement) => {
            button.disabled = false;
        })
    }

    detached() {
        this.subscriptions.forEach(subscription => {
            subscription.dispose();
        });
        this.subscriptions = [];
    }
}
