// import Utils from '../utils/itemFunctions';
import Realm from 'realm';

// class ItemModel {
//     constructor(itemName, dueDate, completed=false) {
//         this.id = Utils.guid()
//         this.name = itemName
//         this.dueDate = dueDate
//         this.completed = completed
//         this.completedDate = new Date()
//     }
// }

class BucketItem extends Realm.Object { }
BucketItem.schema = {
    name: "BucketItem",
    properties: {
        id: "string",
        title: "string",
        dueDate: "string",
        completed: {type: "bool", default: false},
        completedDate: "string",
    },
    primaryKey: "id"
};

export default new Realm({ schema: [BucketItem] });