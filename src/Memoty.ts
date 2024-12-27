import {YbaOyra} from "./YbaOyra";

export class Memoty {
    private readonly name: string;
    private readonly label: string;
    private readonly container: HTMLElement;
    private readonly ul: HTMLUListElement | undefined;
    private readonly li: HTMLLIElement | undefined;

    private readonly branches: Map<string, Memoty>;

    constructor(container: HTMLElement, name: string = "", label: string = "", mainNode: boolean = false, hasChildren: boolean = false) {
        this.container = container;
        this.name = name;
        this.label = label;
        this.branches = new Map<string, Memoty>();

        if (mainNode) {
            this.ul = document.createElement("ul");
            this.container.appendChild(this.ul);
        } else if (hasChildren) {
            this.ul = document.createElement("ul");
            this.li = document.createElement("li");
            this.container.appendChild(this.li);
            this.li.innerHTML = this.label;

            this.li.appendChild(this.ul);
        } else {
            this.li = document.createElement("li");
            this.container.appendChild(this.li);
            this.li.innerHTML = this.label;
        }
    }

    addBranch(container: HTMLElement | undefined, name: string, label: string, childs: Array<{name:string, label:string, childs:Array<any>}>) {
        if (container === undefined) {
            throw new Error(`Undefined container for '${name}'`);
        }

        if (this.branches.has(name)) {
            throw new Error(`Duplicated Branch with name '${name}'`);
        }

        const m = new Memoty(container, name, label, false, childs.length > 0);
        childs.forEach(child => {
            if (!child.hasOwnProperty('name') || !child.hasOwnProperty('label')) {
                throw new Error(`Chils must have a name and a label for branch '${name}'`);
            }
            m.addBranch(m.getMainList(), `${name}.${child!.name}`, `${child!.label}`, child!.childs);
        });
        this.branches.set(name, m);
    }

    getMainList(): HTMLUListElement | undefined { return this.ul; }
    getListElement(): HTMLLIElement | undefined { return this.li; }

    deleteBranch(name: string): boolean {
        try {
            if (!this.branches.has(name)) { return true; }
            this.branches.delete(name);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    getBranch(name: string): Memoty | undefined {
        try {
            if (!this.branches.has(name)) { return undefined; }
            return this.branches.get(name);
        } catch (error) {
            console.error(error);
            return undefined;
        }
    }
}
