export abstract class ElementWrapper {
    protected readonly el: Element;
    protected readonly handlers: Map<any, EventListener>;

    constructor(query: string) {
        const el = document.querySelector(query);
        if (!el) {
            throw new Error(`Couldn't initialize wrapper: "${query}" not found`);
        }
        this.el = el;
        this.handlers = new Map();
    }

    protected on<T extends Event>(type: string, handler: (event: T) => void) {
        let bound = this.handlers.get(handler);
        if (!bound) {
            bound = handler.bind(this) as EventListener;
            this.handlers.set(handler, bound);
        }
        this.el.addEventListener(type, bound);
    }

    protected off<T extends Event>(type: string, handler: (event: T) => void) {
        const bound = this.handlers.get(handler);
        if (bound) {
            this.el.removeEventListener(type, bound);
        }
    }
}
