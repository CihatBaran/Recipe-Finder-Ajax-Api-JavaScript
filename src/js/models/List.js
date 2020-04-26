import uniqid from 'uniqid';

export default class List {
    constructor() {
        this.items = []
    }

    addItem(count, unit, ingredient) {
        const uniqid = require('uniqid');
        const item = {
            id :uniqid(),
            count: count,
            unit: unit,
            ingredient: ingredient,
        }
        this.items.push(item);
        return item;
    }

    deleteItem(id) {
        const index = this.items.findIndex(el => el.id === id);
        //Splice method will return by cutting original array
        // but slice method works a little different.
        this.items.splice(index, 1);
    }

    updateCount(id, newCount) {
        this.items.find(el => el.id === id).count = newCount;
        //Find returns the element it self, find index return the element index.
    }

}
