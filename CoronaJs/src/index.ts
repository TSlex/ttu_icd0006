console.log("test");

interface IState {
    name: string;
    title: string;

    [propertyName: string]: string
}

let initialState: IState = {
    name: "Aleksandr",
    title: "Sasha C:"
};

let state = new Proxy(initialState, {
    set(target: IState, propertyName: string, value: string) {
        target[propertyName] = value;
        renderUI();
        return true;
    }
});

const renderUI = () => {
    const bindings = Array.from(
        document.querySelectorAll('[data-bindings]')
    ).map((elem) => (elem as HTMLAnchorElement).dataset.bindings!);
    bindings.forEach((binding) => {
        document.querySelector(`[data-bindings='${binding}']`)!.innerHTML
            = state[binding];
        (document.querySelector(`[data-model='${binding}']`)! as HTMLInputElement).value = state[binding];
    })
};

let button = document.querySelector('.js-reset-data') as HTMLAnchorElement;
button.onclick = function () {
    state.name = "Updated values";
    state.title = "in state!";
};

const listeners = Array.from(document.querySelectorAll('[data-model]'));
listeners.forEach((listener) => {
    if (listener instanceof HTMLInputElement) {
        const model = listener.dataset.model!;
        listener.addEventListener('input', (event) => {
            state[model] = listener.value;
        })
    }
});

renderUI();
