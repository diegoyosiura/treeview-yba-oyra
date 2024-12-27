import { Memoty } from './Memoty';
import { YbaOyraOptions } from './YbaOyraOptions';
import { Branch } from './Branch';

/**
 * @class YbaOyra - Is a class for managing hierarchical data structures within a specified container.
 * It initializes a main branch and provides methods to add nested branches.
 */
export class YbaOyra {
    private readonly options: YbaOyraOptions; // Configuration options for the instance

    private readonly mainBranch: Memoty; // The main branch of the hierarchy

    /**
     * Constructs a YbaOyra instance with the specified options.
     * @param {YbaOyraOptions} options - Configuration options. Must include a 'container'.
     * @throws Will throw an error if the 'container' option is not provided.
     */
    constructor(options: YbaOyraOptions) {
        this.options = options;

        if (!this.options.container) {
            throw new Error('YbaOyra requires a container option to initialize the hierarchy.');
        }

        // Initialize the main branch with the specified container
        // Purpose: The mainBranch represents the root of the hierarchy where all other branches are nested.
        // It is initialized as a `Memoty` instance using the provided container to ensure a valid starting point
        // for the entire hierarchical structure. This allows consistent management of branches under this root.
        this.mainBranch = new Memoty(this.options.container, this.options, this, "", "", true, true);
    }

    /**
     * Adds a branch to the main hierarchy.
     * @param {string} name - Unique identifier for the branch.
     * @param {string} label - Display label for the branch.
     * @param {Branch[]} children - An array of nested branches.
     */
    addBranch(name: string, label: string, children: Branch[]) {
        this.mainBranch.addBranch(this.options, this.mainBranch, name, label, children, true);
    }

    /**
     * Adds a branch to the main hierarchy.
     * @param {string} targetName - Unique identifier for the target branch.
     * @param {string} name - Unique identifier for the branch.
     * @param {string} label - Display label for the branch.
     * @param {Branch[]} children - An array of nested branches.
     */
    addInNodeBranch(targetName: string, name: string, label: string, children: Branch[]) {
        const b = this.mainBranch.getBranch(targetName);

        if (!b) {
            throw new Error(`Unable to addBranch: ${name} in ${targetName}`);
        }
        b.addBranch(this.options, b, name, label, children, false);
    }

    deleteBranch(name: string): boolean {
        try {
            const b = this.mainBranch.getBranch(name);

            if (!b) {
                return false;
            }
            return b.delete();
        } catch (error) {
            console.error(`Error deleting branch '${name}':`, error);
            return false;
        }
    }

    getBranch(name: string): Memoty | undefined {
        return this.mainBranch.getBranch(name);
    }

    /**
     * Returns the main list element (UL) for the branch.
     * @returns {HTMLUListElement | undefined} The main list element.
     */
    getMainList(): HTMLUListElement | undefined {
        return this.mainBranch.getMainList();
    }

    /**
     * Returns the list item element (LI) for the branch.
     * @returns {HTMLLIElement | undefined} The list item element.
     */
    getListElement(): HTMLLIElement | undefined {
        return this.mainBranch.getListElement();
    }
}
