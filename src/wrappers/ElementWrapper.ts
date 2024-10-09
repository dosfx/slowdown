export abstract class ElementWrapper {
    protected readonly el: Element;

    constructor(query: string) {
        const el = document.querySelector(query);
        if (!el) {
            throw new Error(`Couldn't initialize wrapper: "${query}" not found`);
        }
        this.el = el;
    }
}