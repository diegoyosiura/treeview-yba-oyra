import { Memoty } from './Memoty';

export class YbaOyra {
    private readonly options: Record<string, any>;

    private mainBranch: Memoty;

    constructor(options: Record<string, any> = {}) {
        this.options = options;

        if (!this.options.container) {
            throw new Error('YbaOyra requires container container');
        }
        this.mainBranch = new Memoty(this.options.container, "", "", true, true);

    }

    addBranch(name: string, label: string, childs: Array<{name:string, label:string, childs:Array<any>}>) {
        this.mainBranch.addBranch(this.mainBranch.getMainList(), name, label, childs);
    }
}
