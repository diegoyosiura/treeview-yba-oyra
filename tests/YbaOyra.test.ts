import { YbaOyra } from '../src';
import { YbaOyraOptions } from '../src';
import { Branch } from '../src';

describe('YbaOyra', () => {
    let container: HTMLElement;
    let options: YbaOyraOptions;
    let ybaOyra: YbaOyra;

    beforeEach(() => {
        container = document.createElement('div');
        options = { container, deleteAnimationTimeout: 200 };
        ybaOyra = new YbaOyra(options);
    });

    test('should initialize with a main branch', () => {
        const mainList = ybaOyra.getMainList();
        expect(mainList).toBeDefined();
        expect(container.contains(mainList!)).toBeTruthy();
    });

    test('should add a branch to the main hierarchy', () => {
        ybaOyra.addBranch('branch1', 'Branch 1', []);

        const branch = ybaOyra.getBranch('branch1');
        expect(branch).toBeDefined();
        expect(branch?.getListElement()?.innerHTML).toBe('Branch 1');
    });

    test('should add a nested branch', () => {
        ybaOyra.addBranch('parentBranch', 'Parent Branch', []);
        ybaOyra.addInNodeBranch('parentBranch', 'childBranch', 'Child Branch', []);

        const childBranch = ybaOyra.getBranch('parentBranch.childBranch');
        expect(childBranch).toBeDefined();
        expect(childBranch?.getListElement()?.innerHTML).toBe('Child Branch');
    });

    test('should delete a branch', () => {
        ybaOyra.addBranch('branchToDelete', 'Branch to Delete', []);
        expect(ybaOyra.deleteBranch('branchToDelete')).toBe(true);
        expect(ybaOyra.getBranch('branchToDelete')).toBeUndefined();
    });

    test('should not delete a non-existent branch', () => {
        expect(ybaOyra.deleteBranch('nonExistentBranch')).toBe(false);
    });

    test('should handle deeply nested branches', () => {
        ybaOyra.addBranch('rootBranch', 'Root Branch', [
            { name: 'child1', label: 'Child 1', children: [] },
            { name: 'child2', label: 'Child 2', children: [
                    { name: 'grandchild', label: 'Grandchild', children: [] }
                ]}
        ]);

        const grandchild = ybaOyra.getBranch('rootBranch.child2.grandchild');
        expect(grandchild).toBeDefined();
        expect(grandchild?.getListElement()?.innerHTML).toBe('Grandchild');
    });

    test('should throw an error when adding to a non-existent branch', () => {
        expect(() => {
            ybaOyra.addInNodeBranch('nonExistentBranch', 'childBranch', 'Child Branch', []);
        }).toThrowError('Unable to addBranch: childBranch in nonExistentBranch');
    });

    test('should return undefined for a non-existent branch', () => {
        const branch = ybaOyra.getBranch('nonExistentBranch');
        expect(branch).toBeUndefined();
    });

    test('should retrieve the main list element', () => {
        const mainList = ybaOyra.getMainList();
        expect(mainList).toBeDefined();
        expect(mainList?.classList.contains('__yba_oyra-memoty-ul')).toBeTruthy();
    });

    test('should retrieve the main list item element', () => {
        const mainListItem = ybaOyra.getListElement();
        expect(mainListItem).toBeUndefined(); // Main branch does not have a list item
    });
});
