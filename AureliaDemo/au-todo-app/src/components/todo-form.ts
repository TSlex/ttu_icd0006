import { bindable, autoinject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { EventChannels } from 'types/EventChannels';
import { AppState } from 'state/app-state';

@autoinject
export class TodoForm {

    @bindable public placeholder = "";
    @bindable public appTitle = "";
    @bindable public submitButtonTitle = "";

    private _input = "";

    constructor(private appState: AppState, private eventAggregator: EventAggregator) {
        
    }

    formSubmitted(event: Event) {
        if (this._input.length > 0) {

            // this._todos.push({description: this._input, done: false})

            console.log(this.appState.getTodos());
            //this.eventAggregator.publish(EventChannels.NewTodoCreation, this._input);
            this.appState.addTodo(this._input);
            console.log(this.appState.getTodos());
        }
        this._input = "";
        event.preventDefault();

    }
}
