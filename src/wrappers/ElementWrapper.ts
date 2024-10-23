export class ElementWrapper {
    protected readonly el: Element;
    protected readonly handlers: Map<any, EventListener>;

    constructor(query: string);
    constructor(element: Element);
    constructor(input: string | Element) {
        this.el = input instanceof Element ? input :
            this.throwNoEl(document.querySelector(input), input)
        this.handlers = new Map();
    }

    private throwNoEl(el: Element | null, query: string) {
        if (!el) {
            throw new Error(`Couldn't initialize wrapper: "${query}" not found`);
        }
        return el;
    }

    public child(query: string) {
        const el = this.throwNoEl(this.el.querySelector(query), query);
        return new ElementWrapper(el);
    }

    public clearAttr(attr: string) {
        this.el.removeAttribute(attr);
    }

    public getAttr(attr: string) {
        return this.el.getAttribute(attr);
    }

    public hasAttr(attr: string) {
        return this.el.hasAttribute(attr);
    }

    public setAttr(attr: string, value: string = "") {
        this.el.setAttribute(attr, value);
    }

    public setClass(cls: string, setclear: boolean = true) {
        if (setclear) {
            this.el.classList.add(cls);
        } else {
            this.el.classList.remove(cls);
        }
    }

    public style(prop: string, value?: string) {
        if (value === undefined) {
            return getComputedStyle(this.el)[prop];
        }
        if (this.el instanceof HTMLElement) {
            this.el.style.setProperty(prop, value);
        } else if (this.el instanceof SVGElement) {
            this.el.attributeStyleMap.set(prop, value);
        }
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
