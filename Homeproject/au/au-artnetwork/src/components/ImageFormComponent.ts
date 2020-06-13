import { Router } from 'aurelia-router';
import { RenderImageViewBase } from 'components/RenderImageViewBase';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';
import { autoinject, PLATFORM } from 'aurelia-framework';
import { AppState } from 'state/state';

@autoinject
export abstract class ImageFormComponent extends RenderImageViewBase {

    constructor(
        protected eventAggregator: EventAggregator,
        protected router: Router,
        appState: AppState
    ) {
        super(appState);

        this.subscriptions.push(
            this.eventAggregator.subscribe("onSubmit", () => this.onSubmit()),
            this.eventAggregator.subscribe("onCancel", () => this.onCancel())
        )
    }

    private subscriptions: Subscription[] = [];
    protected errors: string[] = [];

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
