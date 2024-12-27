import { YbaOyra } from '../src/YbaOyra';
import { YbaOyraOptions } from '../src/YbaOyraOptions';

describe('YbaOyra Use Case', () => {
    let container: HTMLElement;
    let options: YbaOyraOptions;
    let tree: YbaOyra;

    beforeEach(() => {
        // Set up the container for the tree
        container = document.createElement('div');
        container.id = 'tree';
        document.body.appendChild(container);

        options = { container, deleteAnimationTimeout: 2000 };

        // Initialize the YbaOyra instance
        tree = new YbaOyra(options);
    });

    afterEach(() => {
        // Clean up DOM after tests
        document.body.removeChild(container);
    });

    test('should initialize the tree correctly', () => {
        expect(tree).toBeDefined();
        expect(tree.getMainList()).toBeDefined();
    });

    test('should add a solo branch', () => {
        tree.addBranch('teste-solo', 'teste-lbl-solo', []);

        const branch = tree.getBranch('teste-solo');
        expect(branch).toBeDefined();
        expect(branch?.getListElement()?.innerHTML).toBe('teste-lbl-solo');
    });

    test('should add a branch with children', () => {
        tree.addBranch('teste-children', 'teste-lbl-children', [
            { name: 'ch-01', label: 'ch-01', children: [] },
            {
                name: 'ch-02',
                label: 'ch-02',
                children: [
                    { name: 'ch-02-01', label: 'ch-02-01', children: [] },
                    { name: 'ch-02-02', label: 'ch-02-02', children: [] },
                    {
                        name: 'ch-02-03',
                        label: 'ch-02-03',
                        children: [
                            { name: 'ch-02-03-01', label: 'ch-02-03-01', children: [] },
                            { name: 'ch-02-03-02', label: 'ch-02-03-02', children: [] },
                        ],
                    },
                    { name: 'ch-02-04', label: 'ch-02-04', children: [] },
                ],
            },
            { name: 'ch-03', label: 'ch-03', children: [] },
            {
                name: 'ch-04',
                label: 'ch-04',
                children: [
                    { name: 'ch-04-01', label: 'ch-04-01', children: [] },
                    { name: 'ch-04-02', label: 'ch-04-02', children: [] },
                    { name: 'ch-04-03', label: 'ch-04-03', children: [] },
                    { name: 'ch-04-04', label: 'ch-04-04', children: [] },
                ],
            },
        ]);

        const parent = tree.getBranch('teste-children');
        expect(parent).toBeDefined();

        // Extract the label element if available
        const labelElement = parent?.getListElement();
        expect(labelElement?.textContent?.trim()).toBe('teste-lbl-childrench-01ch-02ch-02-01ch-02-02ch-02-03ch-02-03-01ch-02-03-02ch-02-04ch-03ch-04ch-04-01ch-04-02ch-04-03ch-04-04');
    });



    test('should handle deleting branches', () => {
        tree.addBranch('teste-solo', 'teste-lbl-solo', []);
        expect(tree.deleteBranch('teste-solo')).toBe(true);

        const branch = tree.getBranch('teste-solo');
        expect(branch).toBeUndefined();
    });

    test('should return undefined for non-existent branches', () => {
        const branch = tree.getBranch('non-existent');
        expect(branch).toBeUndefined();
    });
});
