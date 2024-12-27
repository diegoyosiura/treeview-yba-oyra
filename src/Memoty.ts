import { YbaOyraOptions } from './YbaOyraOptions';
import { Branch } from './Branch';
import { YbaOyra } from "./YbaOyra";

export class Memoty {
    private readonly name: string;
    private readonly label: string;
    private readonly options: YbaOyraOptions;
    private readonly container: HTMLElement;
    private ul: HTMLUListElement | undefined;
    private li: HTMLLIElement | undefined;
    private readonly branches: Map<string, Memoty>;

    /**
     * Represents the parent node of the current branch.
     * This can be either another Memoty instance or the root YbaOyra instance.
     * Used to maintain the hierarchical structure and allow navigation back to the parent.
     */
    public readonly parent: Memoty | YbaOyra;
    private active: boolean;

    /**
     * Constructs a Memoty instance.
     * @param {HTMLElement} container - The container element where the branch will be rendered.
     * @param {YbaOyraOptions} options - Unique identifier for the branch.
     * @param {Memoty | YbaOyra} parent - The parent node in the hierarchy.
     * @param {string} name - Unique identifier for the branch.
     * @param {string} label - Display label for the branch.
     * @param {boolean} mainNode - Whether this is the main/root node.
     * @param {boolean} hasChildren - Whether this branch has child nodes.
     * @param {boolean} active
     */
    constructor(
        container: HTMLElement,
        options: YbaOyraOptions,
        parent: Memoty | YbaOyra,
        name: string = "",
        label: string = "",
        mainNode: boolean = false,
        hasChildren: boolean = false,
        active: boolean = false
    ) {
        this.active = active;
        if (!container) {
            throw new Error("Container must be a valid HTML element.");
        }
        if (!mainNode) {
            if (!name) {
                throw new Error("Name must be a non-empty string.");
            }
            if (!label) {
                throw new Error("Label must be a non-empty string.");
            }
        } else {
            name = "";
            label = "";
        }

        this.container = container;
        this.name = name;
        this.label = label;
        this.options = options;
        this.parent = parent;
        this.branches = new Map<string, Memoty>();

        if (mainNode) {
            this.active = true;
            this.createUL();
            this.container.appendChild(this.ul!);
        } else if (hasChildren) {
            this.createUL();
            this.createLI()
            this.container.appendChild(this.li!);
            this.li!.innerHTML = this.label;
            this.li!.appendChild(this.ul!);
        } else {
            this.createLI()
            this.container.appendChild(this.li!);
            this.li!.innerHTML = this.label;
        }
    }
    private createLI() {
        this.li = document.createElement("li");
        this.li.classList.add("__yba_oyra-memoty-li");
        this.li.addEventListener("click", e => this.onClickLink(e), false);
    }
    private createUL() {
        this.ul = document.createElement("ul");
        this.ul.classList.add("__yba_oyra-memoty-ul");

        if (this.active) {
            this.ul.classList.add("__yba_oyra-active");
        }
    }

    onClickLink(e: MouseEvent) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        if (!this.ul) {
            return;
        }
        if (this.ul.classList.contains("__yba_oyra-active")) {
            this.ul.classList.remove("__yba_oyra-active");
        } else {
            this.ul.classList.add("__yba_oyra-active");
        }
    }
    /**
     * Adds a branch to the hierarchy.
     * @param {YbaOyraOptions} options - Options for configuring the branch.
     * @param {Memoty | YbaOyra} parent - The parent node for the new branch.
     * @param {string} name - Unique identifier for the branch.
     * @param {string} label - Display label for the branch.
     * @param {Branch[]} children - Array of child branches. Each child must have a `name`, `label`, and optionally `children` for nested branches.
     * @param {boolean} active
     * @throws If the container is undefined or the branch name already exists.
     */
    addBranch(
        options: YbaOyraOptions,
        parent: Memoty | YbaOyra,
        name: string,
        label: string,
        children: Branch[],
        active: boolean = false,
    ) {
        if (!name) {
            throw new Error("Branch name must be a non-empty string.");
        }
        if (!label) {
            throw new Error("Branch label must be a non-empty string.");
        }

        const scopedName = (parent instanceof Memoty ? `${parent.name}.${name}` : name).split('.').filter(item => { return !!item; }).join('.');

        if (this.branches.has(scopedName)) {
            throw new Error(`Duplicated branch with name '${scopedName}'. Branch names must be unique within their parent scope.`);
        }


        if (parent instanceof Memoty) {
            parent.convertToChildrenContainer();
        }

        const newBranch = new Memoty(parent.getMainList()!, options, parent, scopedName, label, false, children.length > 0, active);

        children.forEach((child) => {
            if (!child.name || !child.label || !Array.isArray(child.children)) {
                throw new Error(`Invalid child structure for branch '${scopedName}'. Each child must conform to the Branch interface.`);
            }
            newBranch.addBranch(
                options,
                newBranch,
                child.name,
                child.label,
                child.children
            );
        });

        // Note: Duplicate branch names are not allowed. This method ensures that each branch name is unique
        // within the hierarchy by checking the `branches` map before adding a new branch.
        this.branches.set(scopedName, newBranch);
    }

    /**
     * Returns the main list element (UL) for the branch.
     * @returns {HTMLUListElement | undefined} The main list element.
     */
    getMainList(): HTMLUListElement | undefined {
        return this.ul;
    }

    /**
     * Returns the list item element (LI) for the branch.
     * @returns {HTMLLIElement | undefined} The list item element.
     */
    getListElement(): HTMLLIElement | undefined {
        return this.li;
    }

    /**
     * Deletes a branch from the hierarchy.
     * @param {string} name - The name of the branch to delete.
     * @returns {boolean} True if the branch was deleted, false otherwise.
     */
    deleteBranch(name: string): boolean {
        try {
            if (!this.branches.has(name)) {
                return false;
            }

            const branch = this.branches.get(name);
            if (branch?.li) {
                branch.li.classList.add("__yba_oyra-removing-branch");
            }
            if (branch?.ul) {
                branch.ul.classList.add("__yba_oyra-removing-branch")
            }

            setTimeout(() => {
                if (branch?.li) {
                    branch.li.remove();
                }
                if (branch?.ul) {
                    branch.ul.remove();
                }
            }, this.options.deleteAnimationTimeout ?? 200)

            this.branches.delete(name);
            return true;
        } catch (error) {
            console.error(`Error deleting branch '${name}':`, error);
            return false;
        }
    }

    delete(): boolean {
        return this.parent.deleteBranch(this.name);
    }

    convertToChildrenContainer() {
        if (this.ul) {
            return;
        }
        if (!this.li) {
            this.createLI()
            this.container.appendChild(this.li!);
            this.li!.innerHTML = this.label;
        }
        this.createUL();
        this.li!.appendChild(this.ul!);
    }

    /**
     * Retrieves a branch by its name.
     * @param {string} name - The name of the branch to retrieve.
     * @returns {Memoty | undefined} The branch if found, or undefined if not.
     */
    getBranch(name: string): Memoty | undefined {
        try {
            if (!name) {
                return undefined;
            }

            if (this.branches.has(name)) {
                return this.branches.get(name);
            }

            const scopedBranchName = name.split('.');

            if (scopedBranchName.length === 0) {
                return undefined;
            }

            // Handle deeper nested branches
            const firstBranch = scopedBranchName.shift()!;

            if (!this.branches.has(firstBranch)) {
                return undefined;
            }

            let containerBranch: Memoty | undefined = this.branches.get(firstBranch);

            let branch = firstBranch;
            for (const branchName of scopedBranchName) {
                branch = `${branch}.${branchName}`;
                containerBranch = containerBranch?.getBranch(branch);
                if (!containerBranch) {
                    return undefined;
                }
            }

            return containerBranch;
        } catch (error) {
            console.error(`Error retrieving branch '${name}':`, error);
            return undefined;
        }
    }
}
