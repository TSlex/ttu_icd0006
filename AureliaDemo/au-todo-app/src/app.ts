import { autoinject } from 'aurelia-framework';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';
import { ITodo } from "domain/ITodo";
import { EventChannels } from 'types/EventChannels';
import { AppState } from 'state/app-state';


@autoinject
export class App {
    public message: string = 'Hello World!';
    // private _todos: ITodo[] = [];
    private _subscriptions: Subscription[] = [];

    private _placeholder = "What?";
    private _appTitle = "Aurelia Todos";
    private _submitButtonTitle = "Add";

    private _input = "";


    constructor(private appState: AppState, private eventAggregator: EventAggregator) {

        // this._subscriptions.push(
        //     this.eventAggregator.subscribe(
        //         EventChannels.NewTodoCreation,
        //         (description: string) => this.eventNewTodoCreation(description))
        // );

    }

    detache() {
        this._subscriptions.forEach(subscription => subscription.dispose());
        this._subscriptions = [];
    }


    // eventNewTodoCreation(description: string) {
    //     // this._todos.push({ description: description, done: false });
    //     this.appState.addTodo(description)
    // }


    // formSubmitted(event: Event) {
    //     if (this._input.length > 0) {

    //         this._todos.push({ description: this._input, done: false })

    //         // console.log(this.appState.getTodos());
    //         //this.eventAggregator.publish(EventChannels.NewTodoCreation, this._input);
    //         // this.appState.addTodo(this._input);
    //         // console.log(this.appState.getTodos());
    //     }
    //     this._input = "";
    //     event.preventDefault();
    // }

    removeTodo(index: number) {
        if (index < 0 || index >= this.appState.countTodos()) {
            return;
        }
        // this._todos.splice(index, 1)

        this.appState.removeTodo(index);
    }
}
