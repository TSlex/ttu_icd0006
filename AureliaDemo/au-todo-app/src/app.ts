import { ITodo } from "domain/ITodo";


export class App {
    public message: string = 'Hello World!';
    private _todos: ITodo[] = [];

    private _placeholder = "What?";
    private _appTitle = "Aurelia Todos";
    private _submitButtonTitle = "Add";
    private _input = "";

    formSubmitted(event: Event) {
        if (this._input.length > 0) {

            this._todos.push({description: this._input, done: false})

            // console.log(this.appState.getTodos());
            //this.eventAggregator.publish(EventChannels.NewTodoCreation, this._input);
            // this.appState.addTodo(this._input);
            // console.log(this.appState.getTodos());
        }
        this._input = "";
        event.preventDefault();
    }

    removeTodo(index: number){
        if (index < 0 || index >= this._todos.length){
            return;
        }
        this._todos.splice(index, 1)
    }
}
