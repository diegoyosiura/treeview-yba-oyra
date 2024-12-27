import { Memoty } from '../src';
import { YbaOyraOptions } from '../src';
import { YbaOyra } from '../src';

describe('Memoty', () => {
    let container: HTMLElement;
    let options: YbaOyraOptions;
    let root: YbaOyra;

    beforeEach(() => {
        container = document.createElement('div');
        options = { container, deleteAnimationTimeout: 200 }; // Add the required option
        root = new YbaOyra(options);

        // Properly set up the hierarchy
        root.addBranch('parentBranch', 'Parent Label', []);
        const parent = root.getBranch('parentBranch');
        parent?.addBranch(options, parent, 'childBranch', 'Child Label', []);
    });

    test('should initialize a Memoty instance correctly', () => {
        const branch = new Memoty(container, options, root, 'testBranch', 'Test Label', false, false);

        expect(branch.getMainList()).toBeUndefined();
        expect(branch.getListElement()).toBeDefined();
        expect(branch.getListElement()?.innerHTML).toBe('Test Label');
    });

    test('should add a child branch', () => {
        const parent = new Memoty(container, options, root, 'parentBranch', 'Parent Label', false, true);
        parent.addBranch(options, parent, 'childBranch', 'Child Label', []);

        const child = parent.getBranch('parentBranch.childBranch');
        expect(child).toBeDefined();
        expect(child?.getListElement()?.innerHTML).toBe('Child Label');
    });

    test('should handle duplicate branch names', () => {
        const parent = new Memoty(container, options, root, 'parentBranch', 'Parent Label', false, true);
        parent.addBranch(options, parent, 'childBranch', 'Child Label', []);

        expect(() => {
            parent.addBranch(options, parent, 'childBranch', 'Duplicate Label', []);
        }).toThrowError("Duplicated branch with name 'parentBranch.childBranch'. Branch names must be unique within their parent scope.");
    });

    test('should toggle visibility of a branch', () => {
        const branch = new Memoty(container, options, root, 'toggleBranch', 'Toggle Label', false, true);
        branch.onClickLink(new MouseEvent('click'));

        expect(branch.getMainList()?.classList.contains('__yba_oyra-active')).toBeTruthy();

        branch.onClickLink(new MouseEvent('click'));
        expect(branch.getMainList()?.classList.contains('__yba_oyra-active')).toBeFalsy();
    });

    test('should delete a branch', () => {
        const parent = new Memoty(container, options, root, 'parentBranch', 'Parent Label', false, true);
        parent.addBranch(options, parent, 'childBranch', 'Child Label', []);

        expect(parent.deleteBranch('parentBranch.childBranch')).toBe(true);
        expect(parent.getBranch('parentBranch.childBranch')).toBeUndefined();
    });

    test('should retrieve a nested branch', () => {
        const parent = new Memoty(container, options, root, 'parentBranch', 'Parent Label', false, true);
        parent.addBranch(options, parent, 'childBranch', 'Child Label', []);
        parent.addBranch(options, parent, 'anotherChild', 'Another Child', []);

        const nested = parent.getBranch('parentBranch.childBranch');
        expect(nested).toBeDefined();
        expect(nested?.getListElement()?.innerHTML).toBe('Child Label');
    });

    test('should throw error for invalid branch name', () => {
        expect(() => {
            new Memoty(container, options, root, '', '', false, false);
        }).toThrowError('Name must be a non-empty string.');
    });

    test('should convert a branch to children container', () => {
        const branch = new Memoty(container, options, root, 'testBranch', 'Test Label', false, false);
        branch.convertToChildrenContainer();

        expect(branch.getMainList()).toBeDefined();
    });
});
